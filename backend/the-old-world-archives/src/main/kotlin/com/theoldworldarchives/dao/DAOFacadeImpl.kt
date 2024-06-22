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
        userName = row[Posts.userName]
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
        }
        insertStatement.resultedValues?.singleOrNull()?.let(::resultRowToPost)
            ?: throw IllegalArgumentException("Failed to insert a new post")
    }

    override suspend fun editPost(id: Int, title: String, videoFileName: String, description: String, userName: String): Boolean = dbQuery {
        Posts.update({ Posts.id eq id }) {
            it[Posts.title] = title
            it[Posts.videoFileName] = videoFileName
            it[Posts.description] = description
            it[Posts.userName] = userName
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
    }

    override suspend fun editUserPassword(name: String, newPassword: String): Boolean = dbQuery {
        Users.update({ Users.name eq name }) {
            it[Users.password] = newPassword
        } > 0
    }

    override suspend fun deleteUser(name: String): Boolean = dbQuery {
        Users.deleteWhere { Users.name eq name } > 0
    }
}

val dao: DAOFacade = DAOFacadeImpl()