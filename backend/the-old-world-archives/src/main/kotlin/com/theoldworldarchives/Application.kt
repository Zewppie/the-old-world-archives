package com.theoldworldarchives

import com.theoldworldarchives.plugins.*
import com.theoldworldarchives.dao.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.*

fun main() {
    embeddedServer(Netty, 8080) {
        install(CORS) {
            allowHost("0.0.0.0:8081")
            allowCredentials = true
            allowHeader(HttpHeaders.ContentType)
            allowHeader(HttpHeaders.Authorization)
        }
    }.start(wait = true)
}

fun Application.module() {
    DatabaseSingleton.init()
    configureSerialization()
    configureRouting()
}
