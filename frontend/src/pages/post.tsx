import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from "@mantine/core";

interface PostProps {
    postId: number;
}

const Post: React.FC<PostProps> = ({ postId }) => {
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // Fetch post and comments
                const response = await axios.get(`/posts/${postId}`);
                const { post, comments } = response.data;
                setPost(post);
                setComments(comments);

                // Fetch the video file
                const videoResponse = await axios.get(`/posts/videos/${post.videoFileName}`, {
                    responseType: 'blob',
                });
                setVideoBlob(videoResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching post and comments:', error);
                setError('Failed to load post and comments');
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>; // Loading state while fetching post
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    if (!post) {
        return <div>Error: post not found</div>;
    }

    const videoUrl = videoBlob ? URL.createObjectURL(videoBlob) : '';

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 2, marginRight: '20px' }}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                {videoUrl && (
                    <video controls>
                        <source src={videoUrl} type="video/webm"/>
                        Your browser does not support the video tag.
                    </video>
                )}
                <p>by {post.userName}</p>
            </div>
            <div style={{ flex: 1 }}>
                <h3>Comments</h3>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.text}</p>
                                <p><em>by {comment.userName}</em></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Post;
