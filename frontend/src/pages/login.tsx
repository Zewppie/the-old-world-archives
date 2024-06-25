import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';
import {Box, Button, PasswordInput, TextInput} from '@mantine/core';
import { useForm } from '@mantine/form';

const Login: React.FC = () => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (value) => (value ? null : 'Username is required'),
            password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            // gets user info for user session
            const response = await axios.post('/user/login', {
                name: values.username,
                password: values.password
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
        navigate('/register')
    }

    return (
        <Box>
            <div style={{padding: '10px'}}>
                <h1 align="center">Login</h1>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Username"
                        placeholder="Username"
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        mt="sm"
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" mt="sm" fullWidth>
                        Login
                    </Button>
                    <div>
                        <Button variant="filled" mt="sm" fullWidth color="indigo" onClick={() => navigate('/register')}>Register</Button>
                    </div>
                </form>
            </div>
        </Box>
    );
};


export default Login;
