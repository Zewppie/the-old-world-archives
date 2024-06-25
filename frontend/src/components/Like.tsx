import React, { useState } from "react";
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

const Like: React.FC<LikeProps> = ({ postId, likeCount, setLikeCount}) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLike = async () => {
        setError(null);
        setIsFetching(true);

        try {
            const response = await axios.post(`/posts/${postId}/likes`);
            setLiked(true)
            setLikeCount(prev => prev + 1)
        } catch (error) {
            setError("Failed to like post");
        } finally {
            setIsFetching(false);
        }
    };

    const handleUnlike = async () => {
        setError(null);
        setIsFetching(true);

        try {
            const response = await axios.delete(`/posts/${postId}/likes`);
            setLiked(false)
            setLikeCount(prev => prev - 1)
        } catch (error) {
            setError("Failed to unlike post");
        } finally {
            setIsFetching(false);
        }
    }

    const handleLikeUnlike = () => {
        if(!user) {
            navigate('/login');
        }
        liked ? handleUnlike() : handleLike();
    }

    return (
        <div>
            <button
                onClick={handleLikeUnlike}
                className={`likeBtn ${liked ? "liked" : ""}`}
                disabled={isFetching}
            >
                {isFetching ? <Loader size="xs"/> : <IconHeart size={16}/>}
                {liked ? "Liked" : "Like"}
            </button>
            {error && <div className="error">{error}</div>}
            <span style={{marginLeft: '8px'}}>{likeCount}</span>
        </div>
    );
};

export default Like;

