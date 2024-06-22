package com.theoldworldarchives.routes

import com.theoldworldarchives.dao.*
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

fun Route.postRouting() {
    route("/posts") {
        get {
            call.respond(FreeMarkerContent("index.ftl", mapOf("posts" to dao.allPosts())))
        }
        get("{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@get call.respond(HttpStatusCode.BadRequest, "Missing id")
            val post = dao.post(id) ?: return@get call.respond(HttpStatusCode.NotFound, "Post not found")
            // lets frontend require the video file from the video filename
            call.respond(HttpStatusCode.OK, post)
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

            multipart.forEachPart { part ->
                when (part) {
                    is PartData.FormItem -> {
                        when (part.name) {
                            "title" -> title = part.value
                            "description" -> description = part.value
                            "userName" -> userName = part.value
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

                val post = dao.addNewPost(auxTitle, auxVideoFile!!.name, auxDescription, auxUserName)
                if (post != null) {
                    call.respond(HttpStatusCode.OK, post)
                } else {
                    call.respond(HttpStatusCode.BadRequest, "Failed to upload post")
                }
            } else {
                call.respond(HttpStatusCode.BadRequest, "Missing parameters")
            }
        }
        post("{id}") {
            val id = call.parameters.getOrFail<Int>("id").toInt()
            val formParameters = call.receiveParameters()
            when (formParameters.getOrFail("_action")) {
                "update" -> {
                    val title = formParameters.getOrFail("title")
                    val videoFilepath = formParameters.getOrFail("videoFilepath")
                    val description = formParameters.getOrFail("description")
                    val userName = formParameters.getOrFail("userName")
                    dao.editPost(id, title, videoFilepath, description, userName)
                    call.respondRedirect("/posts/$id")
                }
                "delete" -> {
                    dao.deletePost(id)
                    call.respondRedirect("/articles")
                }
            }
        }
    }
}