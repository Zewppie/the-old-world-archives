import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'black', color: 'white', zIndex: 1000 }}>
                <div>
                    <img src="the_old_world_archives_logo.png" alt="Logo" className="logo" style={{ marginRight: '20px' }} onClick={() => navigate('/')}/>
                </div>
                <div>
                    <div>
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }} onClick={() => navigate('/login')}>Login/Register</Button>
                    </div>
                    <div>
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }} onClick={() => navigate('/upload')}>Create Post</Button>
                    </div>
                    <Link to="/posts">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }} onClick={() => navigate('/posts')}>Posts</Button>
                    </Link>
                    <Link to="/entities">
                        <Button variant="filled" color="indigo" onClick={() => navigate('/entities')}>Entity Wiki</Button>
                    </Link>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Header;