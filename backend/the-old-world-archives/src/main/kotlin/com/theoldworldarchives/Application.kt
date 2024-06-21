package com.theoldworldarchives

import com.theoldworldarchives.plugins.*
import com.theoldworldarchives.dao.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.*

fun Application.configureCors() {
    install(CORS) {
        allowHost("0.0.0.0:8081")
        allowCredentials = true
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
    }
}

fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    DatabaseSingleton.init()
    configureSerialization()
    configureRouting()
    configureCors()
}
