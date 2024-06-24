package com.theoldworldarchives.dao

import com.theoldworldarchives.models.*

interface DAOFacade {
    suspend fun allPosts(): List<Post>
    suspend fun post(id: Int): Post?
    suspend fun addNewPost(title: String, videoFileName: String, description: String, userName: String): Post?
    suspend fun editPost(id: Int, title: String, videoFileName: String, description: String, userName: String, likes: Int): Boolean // may not be used
    suspend fun deletePost(id: Int): Boolean

    suspend fun allUsers(): List<User>
    suspend fun user(name: String): User?
    suspend fun addNewUser(name: String, password: String): User?
    suspend fun editUserPassword(name: String, newPassword: String): Boolean
    suspend fun deleteUser(name: String): Boolean

    suspend fun addNewComment(text: String, userName: String, postId: Int): Comment?
    suspend fun allCommentsFromPost(postId: Int): List<Comment>
    suspend fun deleteComment(id: Int): Boolean
}