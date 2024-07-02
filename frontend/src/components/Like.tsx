import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';
import { Loader } from '@mantine/core';
import { useUser } from './UserContext';
import axios from "axios";

interface LikeProps {
    postId: number;
    likeCount: number;
    setLikeCount: React.Dispatch<React.SetStateAction<number>>;
}

const Like: React.FC<LikeProps> = ({ postId, likeCount, setLikeCount }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLike = async () => {
        setError(null);
        setIsFetching(true);

        try {
            console.log(`Liking post with user: ${user?.name}`);
            const response = await axios.post(`/posts/${postId}/likes/${user?.name}`);
            setLiked(true);
            setLikeCount(response.data.likes);
        } catch (error) {
            console.error("Error liking post:", error);
            if(error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
            setError("Failed to like post");
        } finally {
            setIsFetching(false);
        }
    };

    const handleUnlike = async () => {
        setError(null);
        setIsFetching(true);

        try {
            const response = await axios.delete(`/posts/${postId}/likes/${user?.name}`);
            setLiked(false);
            setLikeCount(response.data.likes);
        } catch (error) {
            setError("Failed to unlike post");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        const fetchLikeStatus = async () => {
            setError(null);
            setIsFetching(true);

            if (user) {
                try {
                    const response = await axios.get(`/posts/${postId}/likes/${user.name}`);
                    setLiked(response.data.isLiked);
                } catch (error) {
                    console.error('Error fetching like status:', error);
                } finally {
                    setIsFetching(false);
                }
            }
        };

        fetchLikeStatus();
    }, [postId, user]);

    const handleLikeUnlike = () => {
        if (!user) {
            navigate('/login');
        } else {
            liked ? handleUnlike() : handleLike();
        }
    };

    return (
        <div>
            <button
                onClick={handleLikeUnlike}
                className={`likeBtn ${liked ? "liked" : ""}`}
                disabled={isFetching}
            >
                {isFetching ? <Loader size="xs" /> : <IconHeart size={16} />}
                {liked ? "Liked" : "Like"}
            </button>
            {error && <div className="error">{error}</div>}
            <span style={{ marginLeft: '8px' }}>{likeCount}</span>
        </div>
    );
};

export default Like;
