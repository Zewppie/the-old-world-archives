package com.theoldworldarchives.dao

import com.theoldworldarchives.models.*

interface DAOFacade {
    suspend fun allPosts(): List<Post>
    suspend fun post(id: Int): Post?
    suspend fun addNewPost(title: String, videoFilepath: String, description: String): Post?
    suspend fun editPost(id: Int, title: String, videoFilepath: String, description: String): Boolean // may not be used
    suspend fun deletePost(id: Int): Boolean
}