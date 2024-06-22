import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PostCreationProps {
    userName: string;
}

const PostCreation: React.FC<PostCreationProps> = ({ userName }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const navigate = useNavigate()

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
        uploadData.append('userName', userName);

        try {
            const response = await axios.post('/posts/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Post created successfully', response.data);
            // Redirect to page with the created post
            navigate(`/posts/${response.data.id}`)
        } catch (error) {
            console.error('Error creating post', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Video:
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                    />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostCreation;
