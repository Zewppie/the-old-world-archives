package com.theoldworldarchives.models

import kotlinx.serialization.Serializable
import java.util.concurrent.atomic.AtomicInteger
import org.jetbrains.exposed.sql.*


@Serializable
data class Comment(val id: Int, val text: String, val userName: String, val postId: Int) {
    companion object {
        private val idCounter: AtomicInteger = AtomicInteger()

        fun new(text: String, userName: String, postId: Int): Comment {
            return Comment(idCounter.getAndIncrement(), text, userName, postId)
        }
    }
}

object Comments : Table() {
    val id = integer("id").autoIncrement()
    val text = text("text")
    // leaves user and post as is on deletion
    val userName = varchar("user", 128).references(Users.name, onDelete = ReferenceOption.NO_ACTION)
    val postId = integer("postId").references(Posts.id, onDelete = ReferenceOption.NO_ACTION)

    override val primaryKey = PrimaryKey(this.id)
}
