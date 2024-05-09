package com.theoldworldarchives.plugins

import com.theoldworldarchives.routes.postRouting
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        postRouting()
    }
}
