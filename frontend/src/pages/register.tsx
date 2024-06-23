import React, {useContext, useState} from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Box } from '@mantine/core';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import '../index.css';

const Register = () => {
    // make form for user to provide input
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
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext)

    const handleSubmit = async (values: typeof form.values) => {
        try {
            // make POST request to the given backend endpoint with the given
            // JSON structure and stores the response
            const response = await axios.post('/user/register', {
                name: values.username, // backend expects field "name" instead of "username"
                password: values.password
            }, {
                // header must be set because backend only allows for
                // 'content-type' and 'authorization' headers
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('User registered successfully:', response.data);

            setUser(response.data)
            navigate('/posts')
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <Box>
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
                    Register
                </Button>
                <Link to="/login">
                    <Button variant="filled" color="indigo">Login</Button>
                </Link>
            </form>
        </Box>
    );
};

export default Register;