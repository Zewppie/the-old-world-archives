import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

const Login: React.FC = () => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // gets user info for user session
            const response = await axios.post('/user/login', {
                name,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setUser(response.data);
            console.log('Logged in user:', {name, password});

            navigate('/posts');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const redirectToRegister = () => {
        navigate('register')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={name} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
                <Link to="/register">
                    <Button variant="filled" color="indigo">Register</Button>
                </Link>
            </form>
        </div>
    );
};


export default Login;
