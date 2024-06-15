package com.theoldworldarchives

import com.theoldworldarchives.models.Post
import com.theoldworldarchives.plugins.configureRouting
import com.theoldworldarchives.plugins.configureSerialization
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import kotlin.test.Test
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import kotlin.test.assertEquals

// DEPRECATED
class PostRouteTest {
    @Test
    fun testPostPost() =  testApplication {
        application {
            configureSerialization()
            configureRouting()
        }
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }
        val post = Post(
            200,
            "funny-little-title",
            "path/to/funny/video",
            "funny tiny little description",
            "user"
        )
        // see what the client gets as answer when trying to make a post
        val response = client.post("/post") {
            contentType(ContentType.Application.Json)
            setBody(post)
        }
        // see if post was made as expected (got the correct HTTP status and
        // correct text response
        assertEquals("Post posted", response.bodyAsText())
        assertEquals(HttpStatusCode.Created, response.status)
    }

    @Test
    fun testPostGet() = testApplication {
        application {
            configureSerialization()
            configureRouting()
        }
        val expectedPost = Post(
                200,
                "funny-little-title",
                "path/to/funny/video",
                "funny tiny little description",
            "user"
        )
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }
        // making a post first for then requesting a GET
        val postResponse = client.post("/post") {
            contentType(ContentType.Application.Json)
            setBody(expectedPost)
        }

        val getResponse = client.get("/post/200")
        assertEquals(
            """{"id":200,"title":"funny-little-title","video_filepath":"path/to/funny/video","description":"funny tiny little description"}""",
            getResponse.bodyAsText())
    }

    @Test
    fun testPostDelete() = testApplication {
        application {
            configureSerialization()
            configureRouting()
        }
        val expectedPost = Post(
            200,
            "funny-little-title",
            "path/to/funny/video",
            "funny tiny little description",
            "user"
        )
        val client = createClient {
            install(ContentNegotiation) {
                json()
            }
        }
        // making a post first for then requesting a GET
        val postResponse = client.post("/post") {
            contentType(ContentType.Application.Json)
            setBody(expectedPost)
        }

        val deleteResponse = client.delete("post/200")
        assertEquals(
            "Post removed correctly",
            deleteResponse.bodyAsText()
        )
    }
}