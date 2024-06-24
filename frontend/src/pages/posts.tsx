import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from "@mantine/core";
import { useNavigate } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    videoFileName: string;
    description: string;
    userName: string;
}

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate()

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
            <h1>Posts</h1>
            {/* Add your content here */}
            <ul>
                {posts.map(post => (
                    <li key={post.id} onClick={() => navigate(`/posts/${post.id}`)} style={{cursor: 'pointer'}}>
                            {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;