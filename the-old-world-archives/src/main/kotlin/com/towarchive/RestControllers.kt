package com.towarchive

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/posts")
class PostController {
    val posts = mutableListOf(Post(title = "título",
                                    video = "bruh",
                                    description = "descrição do post"))

    @GetMapping
    fun posts(): MutableList<Post> {
        return posts
    }
}