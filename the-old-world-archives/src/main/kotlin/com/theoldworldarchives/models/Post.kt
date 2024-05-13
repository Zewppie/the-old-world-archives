package com.theoldworldarchives.models

import kotlinx.serialization.Serializable
import java.util.concurrent.atomic.AtomicInteger
import org.jetbrains.exposed.sql.*

@Serializable
data class Post(
    val id: Int,
    val title: String,
    val videoFilepath: String,
    val description: String,

) {
    companion object {
        private val idCounter = AtomicInteger()

        fun new(title: String, videoFilepath: String, description: String): Post {
            return Post(idCounter.getAndIncrement(), title, videoFilepath, description)
        }
    }
}

// in-memory list just for test purposes
// val postStorage = mutableListOf<Post>()

object Posts : Table() {
    val id = integer("id").autoIncrement()
    val title = varchar("title", 128)
    val videoFilepath = varchar("videoFilepath", 128)
    val description = varchar("description", 1024)

    override val primaryKey = PrimaryKey(this.id)
}