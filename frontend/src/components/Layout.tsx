import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header.tsx";

const Layout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div>
            <Header>
                {children}
            </Header>
        </div>
    );
};

export default Layout;
