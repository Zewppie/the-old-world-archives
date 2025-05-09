package com.theoldworldarchives.routes

import com.theoldworldarchives.dao.*
import com.theoldworldarchives.models.Comment
import com.theoldworldarchives.models.Post
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.freemarker.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import kotlinx.serialization.Serializable
import java.io.File
import java.util.*

@Serializable
data class PostRequest(val title: String, val description: String, val userName: String)

@Serializable
data class PostResponse(val post: Post, val comments: List<Comment>)

@Serializable
data class CommentRequest(val text: String, val userName: String, val postId: Int)

fun Route.postRouting() {
    route("/posts") {
        // POSTS
        get {
            call.respond(mapOf("posts" to dao.allPosts()))
        }
        get("{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@get call.respond(HttpStatusCode.BadRequest, "Missing id")
            try {
                val post = dao.post(id) ?: return@get call.respond(HttpStatusCode.NotFound, "Post not found")
                val postComments = dao.allCommentsFromPost(post.id)
                val response = PostResponse(post, postComments)
                // lets frontend require the video file from the video filename
                call.respond(HttpStatusCode.OK, response)
            } catch (e: Exception) {
                call.application.environment.log.error("Failed to get post and comments", e)
                call.respond(HttpStatusCode.InternalServerError, "Failed to get post and comments")
            }
        }
        get("videos/{filename}") { // handles frontend requisitions to get a video for a post
            val filename = call.parameters["filename"] ?: return@get call.respond(HttpStatusCode.BadRequest, "Missing filename")
            val videoFile = File("resources/uploads/$filename")

            if (videoFile.exists()) {
                call.respondFile(videoFile)
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }
        post("/upload") {
            val multipart = call.receiveMultipart()
            var title: String? = null
            var description: String? = null
            var videoFile: File? = null
            var userName: String? = null
            var likes: Int? = null

            multipart.forEachPart { part ->
                when (part) {
                    is PartData.FormItem -> {
                        when (part.name) {
                            "title" -> title = part.value
                            "description" -> description = part.value
                            "userName" -> userName = part.value
                            "likes" -> likes = part.value.toInt()
                        }
                    }
                    is PartData.FileItem -> {
                        if (part.name == "videoFile") {
                            // saves video file inside resources folder
                            videoFile = File("resources/uploads/${part.originalFileName ?: "video.webm"}")
                            part.streamProvider().use { inputStream ->
                                videoFile!!.outputStream().buffered().use {
                                    inputStream.copyTo(it)
                                }
                            }
                            println("File saved to: ${videoFile!!.absolutePath}") // Log the file path
                        }
                    }
                    else -> Unit
                }
                part.dispose()
            }

            if (title != null && description != null && videoFile != null && userName != null) {
                // non-nullable variables because smart casting to String will just not work
                val auxTitle = title!!
                val auxDescription = description!!
                val auxUserName = userName!!
                val auxVideoFile = videoFile!!
                val auxLikes = likes!!

                val post = dao.addNewPost(auxTitle, auxVideoFile!!.name, auxDescription, auxUserName, auxLikes)
                if (post != null) {
                    call.respond(HttpStatusCode.OK, post)
                } else {
                    call.respond(HttpStatusCode.BadRequest, "Failed to upload post")
                }
            } else {
                call.respond(HttpStatusCode.BadRequest, "Missing parameters")
            }
        }
        delete("{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@delete call.respond(HttpStatusCode.BadRequest, "Missing id")
            try {
                val postDeleted = dao.deletePost(id)

                if (postDeleted) {
                    call.respond(HttpStatusCode.OK, "Post successfully deleted")
                } else {
                    call.respond(HttpStatusCode.BadRequest, "Post could not be deleted")
                }
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, "Invalid delete post request")
            }
        }

        // COMMENTS
        delete("{id}/comments/{commentId}") { // post id will be relevant in the future
            val id = call.parameters["commentId"]?.toIntOrNull() ?: return@delete call.respond(HttpStatusCode.BadRequest, "Invalid comment ID")
            val deleted = dao.deleteComment(id)
            if (deleted) {
                call.respond(HttpStatusCode.OK, "Comment deleted")
            } else {
                call.respond(HttpStatusCode.NotFound, "Comment not found")
            }
        }
        post("/{id}/comments") {
            try {
                val request = call.receive<CommentRequest>()
                val comment = dao.addNewComment(request.text, request.userName, request.postId)
                if (comment != null) {
                    call.respond(HttpStatusCode.OK, comment)
                } else {
                    call.respond(HttpStatusCode.BadRequest, "Failed to add comment")
                }
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, e.message ?: "Invalid add comment request")
            }
        }

        // LIKES
        post("{id}/likes/{userName}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@post call.respond(HttpStatusCode.BadRequest, "Missing id")
            val userName = call.parameters["userName"] ?: return@post call.respond(HttpStatusCode.BadRequest, "Missing userName")
            try {
                val likeAdded = dao.addLike(userName, id)
                if (!likeAdded) {
                    return@post call.respond(HttpStatusCode.BadRequest, "Failed to add like")
                }
                val post = dao.post(id) ?: return@post call.respond(HttpStatusCode.NotFound, "Post not found")
                val updatedPost = dao.editPost(post.id, post.title, post.videoFileName, post.description, post.userName, post.likes + 1)
                if (updatedPost) {
                    call.respond(HttpStatusCode.OK, mapOf("likes" to post.likes + 1))
                } else {
                    call.respond(HttpStatusCode.BadRequest, "Failed to update post likes")
                }
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, e.message ?: "Failed to like")
            }
        }
        delete("{id}/likes/{userName}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@delete call.respond(HttpStatusCode.BadRequest, "Missing id")
            val userName = call.parameters["userName"] ?: return@delete call.respond(HttpStatusCode.BadRequest, "Missing userName")
            try {
                val likeDeleted = dao.deleteLike(userName, id)
                if (!likeDeleted) {
                    return@delete call.respond(HttpStatusCode.BadRequest, "Failed to delete like")
                }
                val post = dao.post(id) ?: return@delete call.respond(HttpStatusCode.NotFound, "Post not found")
                val updatedPost = dao.editPost(post.id, post.title, post.videoFileName, post.description, post.userName, post.likes - 1)
                if (updatedPost) {
                    call.respond(HttpStatusCode.OK, mapOf("likes" to post.likes - 1))
                } else {
                    call.respond(HttpStatusCode.BadRequest, "Failed to update post likes")
                }
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, e.message ?: "Failed to dislike")
            }
        }
        get("{id}/likes/{userName}") {
            val postId = call.parameters["id"]?.toIntOrNull()
            val userName = call.parameters["userName"]

            if (postId == null || userName == null) {
                call.respond(HttpStatusCode.BadRequest, "Invalid parameters")
                return@get
            }

            val isLiked = dao.userLikedPost(userName, postId)
            call.respond(mapOf("isLiked" to isLiked))
        }
    }
}