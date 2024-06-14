package com.theoldworldarchives.dao

import com.theoldworldarchives.models.*

interface DAOFacade {
    suspend fun allPosts(): List<Post>
    suspend fun post(id: Int): Post?
    suspend fun addNewPost(title: String, videoFilepath: String, description: String, userName: String): Post?
    suspend fun editPost(id: Int, title: String, videoFilepath: String, description: String, userName: String): Boolean // may not be used
    suspend fun deletePost(id: Int): Boolean

    suspend fun allUsers(): List<User>
    suspend fun user(name: String): User?
    suspend fun addNewUser(name: String, password: String): User?
    suspend fun editUser(name: String, password: String): Boolean
    suspend fun deleteUser(name: String): Boolean
}