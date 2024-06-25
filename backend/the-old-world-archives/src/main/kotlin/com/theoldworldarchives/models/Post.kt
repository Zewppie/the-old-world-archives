package com.theoldworldarchives.models

import kotlinx.serialization.Serializable
import java.util.concurrent.atomic.AtomicInteger
import org.jetbrains.exposed.sql.*


@Serializable
data class Post(val id: Int,
                val title: String,
                val videoFileName: String,
                val description: String,
                val userName: String,
                val likes: Int
) {
    companion object {
        private val idCounter = AtomicInteger()

        fun new(title: String,
                videoFileName: String,
                description: String,
                userName: String,
                likes: Int
        ): Post {
            return Post(idCounter.getAndIncrement(), title, videoFileName, description, userName, likes)
        }
    }
}

object Posts : Table() {
    val id = integer("id").autoIncrement()
    val title = varchar("title", 128)
    val videoFileName = varchar("videoFileName", 1024)
    val description = text("description")
    val userName = varchar("user", 128).references(Users.name, onDelete = ReferenceOption.CASCADE)
    val likes = integer("likes")

    override val primaryKey = PrimaryKey(this.id)
}