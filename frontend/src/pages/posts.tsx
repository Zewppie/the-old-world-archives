import React from 'react';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../index.css';

function Posts() {
    return (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
                <h1>This is the post page!</h1>
                <Button variant="filled" color="indigo">Get a web post</Button>
        </div>
    );
}

export default Posts;
