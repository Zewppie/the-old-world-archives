package com.theoldworldarchives.routes

import com.theoldworldarchives.dao.*
import io.ktor.server.application.*
import io.ktor.server.freemarker.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*

fun Route.postRouting() {
    route("/posts") {
        get {
            call.respond(FreeMarkerContent("index.ftl", mapOf("posts" to dao.allPosts())))
        }
        get("{id}") {
            val id = call.parameters.getOrFail<Int>("id").toInt()
            call.respond(FreeMarkerContent("show.ftl", mapOf("post" to dao.post(id))))
        }
        post {
            val formParameters = call.receiveParameters()
            val title = formParameters.getOrFail("title")
            val videoFilepath = formParameters.getOrFail("videoFilepath")
            val description = formParameters.getOrFail("description")
            val userName = formParameters.getOrFail("userName")
            val post = dao.addNewPost(title, videoFilepath, description, userName)
            call.respondRedirect("/posts/${post?.id}")
        }
        post("{id}") {
            val id = call.parameters.getOrFail<Int>("id").toInt()
            val formParameters = call.receiveParameters()
            when (formParameters.getOrFail("_action")) {
                "update" -> {
                    val title = formParameters.getOrFail("title")
                    val videoFilepath = formParameters.getOrFail("videoFilepath")
                    val description = formParameters.getOrFail("description")
                    val userName = formParameters.getOrFail("userName")
                    dao.editPost(id, title, videoFilepath, description, userName)
                    call.respondRedirect("/posts/$id")
                }
                "delete" -> {
                    dao.deletePost(id)
                    call.respondRedirect("/articles")
                }
            }
        }
    }
}