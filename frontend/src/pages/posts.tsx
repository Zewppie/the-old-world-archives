import React from 'react';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../index.css';

function Posts() {
    return (
        <div className="container">
            <div className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'black', color: 'white', zIndex: 1000 }}>
                <Link to="/">
                    <img src="the_old_world_archives_logo.png" alt="Logo" className="logo" style={{ marginRight: '20px' }} />
                </Link>
                <div>
                    <Link to="/register">
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
            <div style={{ textAlign: 'center', paddingTop: '100px' }}>
                <h1>This is the post page!</h1>
                <Button variant="filled" color="indigo">Get a web post</Button>
            </div>
        </div>
    );
}

export default Posts;
