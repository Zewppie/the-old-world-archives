package com.theoldworldarchives

import com.theoldworldarchives.plugins.*
import com.theoldworldarchives.dao.*
import io.ktor.server.engine.embeddedServer
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.*
import io.ktor.server.auth.*
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.auth.jwt.*

fun Application.configureCors() {
    install(CORS) {
        allowSameOrigin = true // allows for HTTP requests from the same origin
        allowHost("0.0.0.0:8081")
        allowHost("localhost:8081")
        allowHost("127.0.0.1:8081")
        // uncomment below for production (only hosts above for testing)
        //anyHost()
        allowCredentials = true
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        // this allows for receiving headers of the following type
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
    }
}

fun Application.configureAuthentication() {
    install(Authentication) {
        jwt("auth-jwt") {
            realm = "The Old World Archives"
            verifier(
                JWT
                    .require(Algorithm.HMAC256("the-fusca-4-porta-is-a-lie"))
                    .withAudience("the-old-world-archives")
                    .withIssuer("https://localhost:8080")
                    .build()
            )
            validate { credential ->
                if (credential.payload.getClaim("name").asString().isNotEmpty()) {
                    JWTPrincipal(credential.payload)
                } else {
                    null
                }
            }
        }
    }
}

fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    DatabaseSingleton.init()
    //DatabaseSingleton.reset()
    configureSerialization()
    configureAuthentication()
    configureRouting()
    configureCors()
}
