package com.theoldworldarchives.routes

import com.theoldworldarchives.dao.dao
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

fun Route.userRouting() {
    route("/user") {
        get("{name}") {
            val name = call.parameters.getOrFail<Int>("name").toString()
            // pass information to react to put on the page
        }
        post {
            val formParameters = call.receiveParameters()
            val name = formParameters.getOrFail("name")
            val password = formParameters.getOrFail("password")
            val user = dao.addNewUser(name, password)
            // redirects to user page
            call.respondRedirect("/user/${user?.name}")
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
