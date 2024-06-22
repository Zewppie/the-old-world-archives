import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Button} from "@mantine/core";

interface PostProps {
    postId: number;
}

const Post: React.FC<PostProps> = ({ postId }) => {
    const [post, setPost] = useState<any>(null);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // get post by ID
                const response = await axios.get(`/posts/${postId}`);
                setPost(response.data);
                // get respective post's video file (blob)
                const videoResponse = await axios.get(`/posts/videos/${response.data.videoFileName}`, {
                    responseType: 'blob',
                });
                console.log('Video Blob:', videoResponse.data)
                setVideoBlob(videoResponse.data)

                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Error: post not found</div>;
    }

    if (loading) {
        return <div>Loading...</div>; // Loading state while fetching post
    }

    const videoUrl = videoBlob ? URL.createObjectURL(videoBlob) : '';

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {videoUrl && (
                <video controls>
                    <source src={videoUrl} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            )}
            <p>by {post.userName}</p>
            <Link to="/">
                <Button variant="filled" color="indigo">Return to Home Page</Button>
            </Link>
        </div>
    );
};

export default Post;
