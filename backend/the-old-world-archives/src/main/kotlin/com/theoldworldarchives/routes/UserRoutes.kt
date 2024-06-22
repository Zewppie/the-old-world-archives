package com.theoldworldarchives.routes

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.theoldworldarchives.dao.dao
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import kotlinx.serialization.Serializable

// data class to represent an incoming JSON structure within a request
@Serializable
data class UserRequest(val name: String, val password: String)

fun Route.userRouting() {
    route("/user") {
        post("/register") {
            // TODO: error handling when trying to register a user already in database
            try {
                // receives a JSON payload and deserializes it
                val request = call.receive<UserRequest>()
                // TODO: save password hash instead of pure string
                val user = dao.addNewUser(request.name, request.password)
                // returns user to frontend if not null
                if(user != null) {
                    call.respond(HttpStatusCode.OK, user)
                } else {
                    call.respond(HttpStatusCode.BadRequest, "Failed to register user")
                }
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, e.message ?: "Invalid user registration request")
            }
        }
        post("/login") {
            val loginRequest = call.receive<UserRequest>()
            val name = loginRequest.name
            val password = loginRequest.password

            val user = dao.user(name)
            if(user != null && password == user.password) {
                call.respond(HttpStatusCode.OK, user)
                //val token = JWT.create()
                //   .withAudience("the-old-world-archives")
                //    .withIssuer("https://localhost:8080")
                //    .withClaim("name", name)
                //    .withClaim("password", password)
                //    .sign(Algorithm.HMAC256("the-fusca-4-porta-is-a-lie"))
                // sends authentication token back to frontend
                //call.respond(mapOf("token" to token))
            } else {
                call.respond(HttpStatusCode.Unauthorized, "Invalid user registration request")
            }
        }
        // don't know if will be used
        authenticate("auth-jwt") {
            get("/{name}") {
                val name = call.parameters["name"] ?: return@get call.respond(HttpStatusCode.BadRequest, "Missing name")
                val user = dao.user(name)
                if (user != null) {
                    call.respond(user)
                } else {
                    call.respond(HttpStatusCode.NotFound, "User not found")
                }
            }
        }
        post("{name}") {
            val name = call.parameters.getOrFail<Int>("name").toString()
            val formParameters = call.receiveParameters()
            // it apparently needs that field "_action"
            when (formParameters.getOrFail("_action")) {
                "update" -> {
                    val newPassword = formParameters.getOrFail("new_password")
                    dao.editUserPassword(name, newPassword)
                    // redirects to user page after editing password
                    call.respondRedirect("/user/$name")
                }
                "delete" -> {
                    dao.deleteUser(name)
                    // redirect to posts page until we have a home screen
                    call.respondRedirect("/posts")
                }
            }
        }
    }
}
