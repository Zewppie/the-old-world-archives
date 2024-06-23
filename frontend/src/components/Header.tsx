import React, {ReactNode, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {UserContext, useUser} from './UserContext';

interface HeaderProps {
    children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    }

    return (
        <div className="container">
            <div className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'black', color: 'white', zIndex: 1000 }}>
                <div>
                    <img src="the_old_world_archives_logo.png" alt="Logo" className="logo" style={{ marginRight: '20px' }} onClick={() => navigate('/')}/>
                </div>
                <div>
                    {user ? (
                        <>
                            <span style={{ color: 'white', marginRight: '10px' }}>{user.name}</span>
                            <Button variant="filled" color="indigo" style={{ marginRight: '10px' }} onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }} onClick={() => navigate('/login')}>Login/Register</Button>
                    )}
                    <Button variant="filled" color="indigo" style={{ marginRight: '10px' }} onClick={() => navigate('/upload')}>Create Post</Button>
                    <Button variant="filled" color="indigo" style={{ marginRight: '10px' }} onClick={() => navigate('/posts')}>Posts</Button>
                    <Button variant="filled" color="indigo" onClick={() => navigate('/entities')}>Entity Wiki</Button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Header;