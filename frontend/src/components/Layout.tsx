import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header.tsx";

const Layout = ({ children }) => {
    const navigate = useNavigate();

    // refreshing the page takes you to home page
    useEffect(() => {
        navigate('/');
    }, [history]);

    return (
        <div>
            <Header>
                {children}
            </Header>
        </div>
    );
};

export default Layout;
