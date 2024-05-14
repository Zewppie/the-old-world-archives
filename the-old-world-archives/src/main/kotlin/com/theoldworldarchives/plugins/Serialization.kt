package com.theoldworldarchives.plugins

import com.theoldworldarchives.models.Post
import freemarker.cache.ClassTemplateLoader
import freemarker.core.HTMLOutputFormat
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.freemarker.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureSerialization() {
    install(FreeMarker) {
        templateLoader = ClassTemplateLoader(this::class.java.classLoader, "templates")
        outputFormat = HTMLOutputFormat.INSTANCE
    }
    install(ContentNegotiation) {
        json()
    }
    routing {
        val newPost = Post(
            1,
            "Check out this funny video!!",
            "/static/content_warning_4d93e4cc.webm",
            "That's all folks, like and subscribe for more!"
        )
        get("/posts/samplepost") {
                call.respond(FreeMarkerContent("show.ftl", mapOf("post" to newPost)))
        }
    }
}
