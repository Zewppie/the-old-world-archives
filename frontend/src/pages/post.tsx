import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../components/UserContext';
import Like from "../components/Like.tsx";  // Adjust the path as necessary

interface PostProps {
    postId: number;
}

interface Comment {
    id: number;
    text: string;
    userName: string;
    postId: number;
}

const Post: React.FC<PostProps> = ({ postId }) => {
    const { user } = useUser();
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                // gets post information
                const response = await axios.get(`/posts/${postId}`);
                const { post, comments } = response.data;
                setPost(post);
                setComments(comments);
                setLikeCount(post.likes);

                // gets post's video
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

    const handleCommentSubmit = async () => {
        if (!user) {
            alert('You must be logged in to comment');
            return;
        }

        try {
            // gets comments
            const response = await axios.post(`/posts/${postId}/comments`, {
                userName: user.name,
                text: commentText,
                postId: postId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setComments([...comments, response.data]);
            setCommentText('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>Error: post not found</div>;
    }

    const videoUrl = videoBlob ? URL.createObjectURL(videoBlob) : '';

    return (
        <div style={{ display: 'flex' }}>
            <div style={{flex: 2, marginRight: '20px'}}>
                <h2>{post.title}</h2>
                {videoUrl && (
                    <video controls>
                        <source src={videoUrl} type="video/webm"/>
                        Your browser does not support the video tag.
                    </video>
                )}
                <p>{post.description}</p>
                <p>by {post.userName}</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Like postId={postId} likeCount={likeCount} setLikeCount={setLikeCount} />
                </div>
            </div>
            <div style={{flex: 1}}>
            <h3>Comments</h3>
                {user && (
                    <div>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            rows={4}
                            cols={50}
                        />
                        <br />
                        <button onClick={handleCommentSubmit}>Submit Comment</button>
                    </div>
                )}
                {!user && <p>You must be logged in to comment.</p>}
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.text}</p>
                                <p><em>{comment.userName}</em></p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Post;
