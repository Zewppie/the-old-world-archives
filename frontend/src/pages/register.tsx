import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Box } from '@mantine/core';
import axios from 'axios';
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
            // handle redirection to user page here (or to home page idk)
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="container">
            <div className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'black', color: 'white', zIndex: 1000 }}>
                <Link to="/">
                    <img src="the_old_world_archives_logo.png" alt="Logo" className="logo" style={{ marginRight: '20px' }} />
                </Link>
                <div>
                    <Link to="/user/register">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }}>Register</Button>
                    </Link>
                    <Link to="/posts">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }}>Posts</Button>
                    </Link>
                    <Link to="/entities">
                        <Button variant="filled" color="indigo">Entity Wiki</Button>
                    </Link>
                </div>
            </div>
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
                </form>
            </Box>
        </div>
    );
};

export default Register;