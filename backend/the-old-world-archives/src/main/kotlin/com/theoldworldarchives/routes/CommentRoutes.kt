package com.theoldworldarchives.routes

import kotlinx.serialization.Serializable
import com.theoldworldarchives.dao.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.freemarker.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import java.io.File
import java.util.*

@Serializable
data class CommentRequest(val text: String, val userName: String, val postId: Int)

fun Route.commentRouting() {
    route("/comment") {
        delete("{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@delete call.respond(HttpStatusCode.BadRequest, "Invalid comment ID")
            val deleted = dao.deleteComment(id)
            if (deleted) {
                call.respond(HttpStatusCode.OK, "Comment deleted")
            } else {
                call.respond(HttpStatusCode.NotFound, "Comment not found")
            }
        }
        post {
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
    }
}