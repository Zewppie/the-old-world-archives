package com.towarchive

import java.time.LocalDateTime

data class Post(
    var title: String,
    var video: String, // idk what to put here by now
    var description: String,
    var createdAt: LocalDateTime = LocalDateTime.now(),
    var slug: String = title.toSlug()
)