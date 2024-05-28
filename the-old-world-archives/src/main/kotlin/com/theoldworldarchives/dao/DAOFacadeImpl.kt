package com.theoldworldarchives.dao

import com.theoldworldarchives.dao.DatabaseSingleton.dbQuery
import com.theoldworldarchives.models.*
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class DAOFacadeImpl : DAOFacade {
    // Post class
    private fun resultRowToPost(row: ResultRow) = Post(
        id = row[Posts.id],
        title = row[Posts.title],
        videoFilepath = row[Posts.videoFilepath],
        description = row[Posts.description]
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

    override suspend fun addNewPost(title: String, videoFilepath: String, description: String): Post? = dbQuery {
        val insertStatement = Posts.insert {
            it[Posts.title] = title
            it[Posts.videoFilepath] = videoFilepath
            it[Posts.description] = description
        }
        insertStatement.resultedValues?.singleOrNull()?.let(::resultRowToPost)
    }

    override suspend fun editPost(id: Int, title: String, videoFilepath: String, description: String): Boolean = dbQuery {
        Posts.update({ Posts.id eq id }) {
            it[Posts.title] = title
            it[Posts.videoFilepath] = videoFilepath
            it[Posts.description] = description
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

    override suspend fun editUser(name: String, password: String): Boolean = dbQuery {
        Users.update({ Users.name eq name }) {
            it[Users.name] = name
            it[Users.password] = password
        } > 0
    }

    override suspend fun deleteUser(name: String): Boolean = dbQuery {
        Posts.deleteWhere { Users.name eq name } > 0
    }
}

val dao: DAOFacade = DAOFacadeImpl().apply {
    runBlocking {
        if(allPosts().isEmpty()) {
            addNewPost("Saquem só esse vídeo engraçado!!", "/static/content_warning_4d93e4cc.webm", "Fala galerinah de mac350 :]")
        }
    }
}