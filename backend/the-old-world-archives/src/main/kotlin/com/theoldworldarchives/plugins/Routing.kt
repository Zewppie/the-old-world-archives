package com.theoldworldarchives.plugins

import com.theoldworldarchives.routes.postRouting
import com.theoldworldarchives.routes.userRouting
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        postRouting()
        userRouting()
        staticResources("/static", "files")
        get("/") {
            call.respondRedirect("/posts")
        }
    }
}
