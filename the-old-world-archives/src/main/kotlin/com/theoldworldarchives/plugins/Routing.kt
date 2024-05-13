package com.theoldworldarchives.plugins

import com.theoldworldarchives.routes.postRouting
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        postRouting()
        staticResources("/static", "files")
        get("/") {
            call.respondRedirect("/static/mainpage.html")
        }
    }
}
