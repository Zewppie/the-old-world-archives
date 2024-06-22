import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    // refreshing the page takes you to home page
    useEffect(() => {
        navigate('/');
    }, [history]);

    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
