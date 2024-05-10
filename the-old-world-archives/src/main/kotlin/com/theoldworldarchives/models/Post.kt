package com.theoldworldarchives.models

import kotlinx.serialization.Serializable

@Serializable
data class Post(
    val id: Int = -1,
    val title: String,
    val video_filepath: String,
    val description: String,
)

// in-memory list just for test purposes
val postStorage = mutableListOf<Post>()