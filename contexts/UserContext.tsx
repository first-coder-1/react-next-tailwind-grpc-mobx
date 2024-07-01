import React, { createContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Defines the user data format
interface User {
    lastName: string;
    uuid: string;
    icon: string;
    team: {
        country: string;
        icon: string;
        name: string;
        isAdmin: boolean;
        id: string;
    };
    firstName: string;
}

// Defines the context form
interface UserContextProps {
    userInfo: User | null;
    setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUserInfo: () => void;
}

// Create the context with an empty pattern
export const UserContext = createContext<UserContextProps | undefined>(undefined);

// Define the context provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    const fetchUserInfo = async () => {
        try {
            const token = Cookies.get('idToken');  // Get the cookies token

            if (!token) {
                console.error('No token found for recover user details');
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_V2_URL || 'https://api.dsfootball.dev';
            const response = await fetch(`${apiUrl}/v2/scout/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error(`Failed to fetch user info: ${response.statusText}`);
                return;
            }

            const data = await response.json();
            setUserInfo(data.item);  // Update the user data

        } catch (error) {
            console.error(`Error fetching user info: ${error}`);
        }
    };

    // Rendering area
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, fetchUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
