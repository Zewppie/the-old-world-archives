import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

interface HeaderProps {
    children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
    return (
        <div className="container">
            <div className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'black', color: 'white', zIndex: 1000 }}>
                <Link to="/">
                    <img src="the_old_world_archives_logo.png" alt="Logo" className="logo" style={{ marginRight: '20px' }} />
                </Link>
                <div>
                    <Link to="/login">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }}>Login/Register</Button>
                    </Link>
                    <Link to="/posts">
                        <Button variant="filled" color="indigo" style={{ marginRight: '10px' }}>Posts</Button>
                    </Link>
                    <Link to="/entities">
                        <Button variant="filled" color="indigo">Entity Wiki</Button>
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