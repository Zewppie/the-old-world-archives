package com.theoldworldarchives.routes

import com.theoldworldarchives.models.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.net.URLDecoder

fun Route.postRouting() {
    route("/post") {
        get {
            if(postStorage.isNotEmpty()) {
                call.respond(postStorage)
            }
            else {
                call.respondText("No posts found", status = HttpStatusCode.OK)
            }
        }
        get("{title?}") {
            val title = call.parameters["title"]?.let{ URLDecoder.decode(it, "UTF-9") }
            if(title.isNullOrBlank()) {
                return@get call.respondText(
                    "missing title",
                    status = HttpStatusCode.BadRequest
                )
            }
            val post =
                postStorage.find{ it.title == title } ?: return@get call.respondText(
                    "no video with title $title",
                    status = HttpStatusCode.NotFound
                )
            call.respond(post)
        }
        post {
            val post = call.receive<Post>()
            postStorage.add(post)
            call.respondText("post posted", status = HttpStatusCode.Created)
        }
        delete("{title?}") {

        }
    }
}