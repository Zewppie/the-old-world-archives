import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button} from "@mantine/core";

interface Post {
    id: number;
    title: string;
    videoFileName: string;
    description: string;
    userName: string;
}

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<{ posts: Post[] }>('/posts', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/">
                <Button variant="filled" color="indigo">Return to Home Page</Button>
            </Link>
        </div>
    );
};

export default Posts;
