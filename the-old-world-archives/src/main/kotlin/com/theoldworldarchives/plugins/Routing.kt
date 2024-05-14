package com.theoldworldarchives.plugins

import com.theoldworldarchives.routes.postRouting
import freemarker.cache.ClassTemplateLoader
import freemarker.core.HTMLOutputFormat
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.freemarker.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        postRouting()
        staticResources("/static", "files")
        get("/") {
            call.respondRedirect("/posts")
        }
    }
}
