import React, { useState, useContext, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../axiosConfig';
import { UserContext } from '../components/UserContext';
import { Button, Stack, TextInput, Textarea, FileInput } from "@mantine/core";
import { IconUpload, IconSend } from '@tabler/icons-react';

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

    const handleFileChange = (file: File | null) => {
        setVideoFile(file);
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
        uploadData.append('likes', 0);

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
            <Stack spacing="md">
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter title"
                />
                <Textarea
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Write a description..."
                    rows={4}
                    autosize
                />
                <FileInput
                    label="Video"
                    placeholder="Select a video file"
                    accept="video/webm"
                    value={videoFile}
                    onChange={handleFileChange}
                    required
                    icon={<IconUpload size={14} />}
                />
                <Button type="submit" leftIcon={<IconSend size={14} />}>
                    Submit
                </Button>
            </Stack>
        </form>
    );
};

export default PostCreation;
