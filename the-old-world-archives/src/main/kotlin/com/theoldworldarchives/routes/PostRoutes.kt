package com.theoldworldarchives.routes

import com.theoldworldarchives.models.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

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
        // TODO see if it is better to deal with non-slug strings on storage
        // or just de-slugify for showing on the page
        get("{title?}") {
            val title = call.parameters["title"] ?: return@get call.respondText(
                "Missing title",
                status = HttpStatusCode.BadRequest
            )
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
            call.respondText("Post posted", status = HttpStatusCode.Created)
        }
        delete("{title?}") {
            val title = call.parameters["title"] ?: return@delete call.respond(HttpStatusCode.BadRequest)
            if(postStorage.removeIf{ it.title == title }) {
                call.respondText("Post removed correctly", status = HttpStatusCode.Accepted)
            }
            else {
                call.respondText("Not Found", status = HttpStatusCode.NotFound)
            }
        }
    }
}