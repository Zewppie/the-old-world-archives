package com.theoldworldarchives.dao

import com.theoldworldarchives.dao.DatabaseSingleton.dbQuery
import com.theoldworldarchives.models.*
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

class DAOFacadeImpl : DAOFacade {
    // Post class
    private fun resultRowToPost(row: ResultRow) = Post(
        id = row[Posts.id],
        title = row[Posts.title],
        videoFileName = row[Posts.videoFileName],
        description = row[Posts.description],
        userName = row[Posts.userName],
        likes = row[Posts.likes],
    )

    override suspend fun allPosts(): List<Post> = dbQuery {
        Posts.selectAll().map(::resultRowToPost)
    }

    override suspend fun post(id: Int): Post? = dbQuery {
        Posts
            .select { Posts.id eq id }
            .map(::resultRowToPost)
            .singleOrNull()
    }

    override suspend fun addNewPost(title: String, videoFileName: String, description: String, userName: String): Post? = dbQuery {
        val insertStatement = Posts.insert {
            it[Posts.title] = title
            it[Posts.videoFileName] = videoFileName
            it[Posts.description] = description
            it[Posts.userName] = userName
            it[Posts.likes] = 0
        }
        insertStatement.resultedValues?.singleOrNull()?.let(::resultRowToPost)
            ?: throw IllegalArgumentException("Failed to insert a new post")
    }

    override suspend fun editPost(id: Int, title: String, videoFileName: String, description: String, userName: String, likes: Int): Boolean = dbQuery {
        Posts.update({ Posts.id eq id }) {
            it[Posts.title] = title
            it[Posts.videoFileName] = videoFileName
            it[Posts.description] = description
            it[Posts.userName] = userName
            it[Posts.likes] = likes
        } > 0
    }

    override suspend fun deletePost(id: Int): Boolean = dbQuery {
        Posts.deleteWhere { Posts.id eq id } > 0
    }

    // User class
    private fun resultRowToUser(row: ResultRow) = User (
        name = row[Users.name],
        password = row[Users.password]
    )

    override suspend fun allUsers(): List<User> = dbQuery {
        Users.selectAll().map(::resultRowToUser)
    }

    override suspend fun user(name: String): User? = dbQuery {
        Users
            .select { Users.name eq name }
            .map(::resultRowToUser)
            .singleOrNull()
    }

    override suspend fun addNewUser(name: String, password: String): User? = dbQuery {
        val insertStatement = Users.insert {
            it[Users.name] = name
            it[Users.password] = password
        }
        insertStatement.resultedValues?.singleOrNull()?.let(::resultRowToUser)
            ?: throw IllegalArgumentException("Failed to create user")
    }

    override suspend fun editUserPassword(name: String, newPassword: String): Boolean = dbQuery {
        Users.update({ Users.name eq name }) {
            it[Users.password] = newPassword
        } > 0
    }

    override suspend fun deleteUser(name: String): Boolean = dbQuery {
        Users.deleteWhere { Users.name eq name } > 0
    }

    // Comment class
    private fun resultRowToComment(row: ResultRow) = Comment (
        id = row[Comments.id],
        text = row[Comments.text],
        userName = row[Comments.userName],
        postId = row[Comments.postId],
    )

    override suspend fun addNewComment(text: String, userName: String, postId: Int): Comment? = dbQuery {
        val insertStatement = Comments.insert {
            it[Comments.text] = text
            it[Comments.userName] = userName
            it[Comments.postId] = postId
        }
        insertStatement.resultedValues?.singleOrNull()?.let(::resultRowToComment)
            ?: throw IllegalArgumentException("Failed to create comment")
    }

    override suspend fun allCommentsFromPost(postId: Int): List<Comment> = dbQuery {
        Comments
            .select { Comments.postId eq postId }
            .map(::resultRowToComment)
    }

    override suspend fun deleteComment(id: Int): Boolean = dbQuery {
        Comments.deleteWhere { Comments.id eq id } > 0
    }
}

val dao: DAOFacade = DAOFacadeImpl()