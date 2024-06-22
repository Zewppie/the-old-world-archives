import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../axiosConfig';

interface User {
    name: string;
    // maybe on the future
    //profilePic;
}

// manages user state globally
interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // not used
        const fetchUser = async (name: String) => {
            try {
                const response = await axios.get('/user/{name}');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
