import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Box } from '@mantine/core';
import axios from 'axios';

const Register = () => {
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
            const response = await axios.post('/user/register', {
                name: values.username, // backend expects field "name" instead of "username"
                password: values.password
            }, {
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
        <Box sx={{ maxWidth: 300 }} mx="auto">
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
    );
};

export default Register;