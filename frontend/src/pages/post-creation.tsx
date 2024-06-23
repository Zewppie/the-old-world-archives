import React, { useState, useContext, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../axiosConfig';
import { UserContext } from '../components/UserContext';
import {Button} from "@mantine/core";

const PostCreation: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // a user that is not logged-in needs to be redirected to login page
    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setVideoFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!videoFile) {
            alert("Please upload a video file.");
            return;
        }

        const uploadData = new FormData();
        uploadData.append('title', title);
        uploadData.append('description', description);
        uploadData.append('videoFile', videoFile);
        if (user && user.name) {
            uploadData.append('userName', user.name);
        }

        try {
            const response = await axios.post('/posts/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Post created successfully', response.data);
            navigate(`/posts/${response.data.id}`);
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Video:</label>
                <input
                    type="file"
                    accept="video/webm"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
            <Link to="/">
                <Button variant="filled" color="indigo">Return to Home Page</Button>
            </Link>
        </form>
    );
};

export default PostCreation;
