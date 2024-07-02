package com.theoldworldarchives.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*


@Serializable
data class Like(
    val userName: String,
    val postId: Int
) {
    companion object {
        fun new(
            userName: String,
            postId: Int
        ): Like {
            return Like(userName, postId)
        }
    }
}

object Liked : Table() {
    val userName = varchar("name", 128).references(Users.name, onDelete = ReferenceOption.CASCADE)
    val postId = integer("id").references(Posts.id, onDelete = ReferenceOption.CASCADE)

    override val primaryKey = PrimaryKey(this.userName, this.postId)
}

