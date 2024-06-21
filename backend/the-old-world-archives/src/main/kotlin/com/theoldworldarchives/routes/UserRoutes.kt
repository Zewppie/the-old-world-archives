package com.theoldworldarchives.routes

import com.theoldworldarchives.dao.dao
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import kotlinx.serialization.Serializable

// data class to represent an incoming JSON structure within a request
@Serializable
data class RegistrationRequest(val name: String, val password: String)

fun Route.userRouting() {
    route("/user") {
        get("{name}") {
            val name = call.parameters.getOrFail<Int>("name").toString()
            // pass information to react to put on the page
        }
        post("/register") {
            // TODO: error handling when trying to register a user already in database
            try {
                // receives a JSON payload and deserializes it
                val request = call.receive<RegistrationRequest>()
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
