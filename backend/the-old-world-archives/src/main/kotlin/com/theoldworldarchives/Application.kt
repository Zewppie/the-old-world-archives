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
        allowSameOrigin = true // allows for HTTP requests from the same origin
        allowHost("0.0.0.0:8081")
        allowHost("localhost:8081")
        allowHost("127.0.0.1:8081")
        // uncomment below for production (only hosts above for testing)
        //anyHost()
        allowCredentials = true
        // this allows for receiving headers of the following type
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
