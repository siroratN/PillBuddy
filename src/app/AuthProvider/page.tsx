'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/nextjs';
import RoleCheck from '@/components/RoleCheck';

export const RoleContext = createContext<any>(null);

const AuthProvider = () => {
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (isSignedIn && user) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/role`, {
                        params: { clerkID: user.id },
                    });

                    if (response.status == 200) {
                        console.log('dd')
                        setRole(response.data.role);
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };

        fetchUserRole();
    }, [isSignedIn, user]);

    return (
        <RoleContext.Provider value={{ role }}>
            <RoleCheck />
        </RoleContext.Provider>
    );
};

export default AuthProvider;
