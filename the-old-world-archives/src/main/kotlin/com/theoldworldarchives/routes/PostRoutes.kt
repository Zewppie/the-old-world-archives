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
        get("{id?}") {
            val id = call.parameters["id"] ?: return@get call.respondText(
                "Missing id",
                status = HttpStatusCode.BadRequest
            )
            val post =
                postStorage.find { it.id == id.toInt() } ?: return@get call.respondText(
                    "no post with id $id",
                    status = HttpStatusCode.NotFound
                )
            call.respond(post)
        }
        post {
            val post = call.receive<Post>()
            postStorage.add(post)
            call.respondText("Post posted", status = HttpStatusCode.Created)
        }
        delete("{id?}") {
            val id = call.parameters["id"] ?: return@delete call.respond(HttpStatusCode.BadRequest)
            if(postStorage.removeIf{ it.id == id.toInt() }) {
                call.respondText("Post removed correctly", status = HttpStatusCode.Accepted)
            }
            else {
                call.respondText("Not Found", status = HttpStatusCode.NotFound)
            }
        }
    }
}