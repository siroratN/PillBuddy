// AuthProvider.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


interface RoleContextType {
    role: string | null;
}

export const RoleContext = createContext<RoleContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter(); 


    useEffect(() => {
        const fetchUserRole = async () => {
            if (isSignedIn && user) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/role`, {
                        params: { clerkID: user.id },
                    });

                    if (response.status === 200) {
                        console.log('User role fetched:', response.data.role);
                        setRole(response.data.role);

                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };

        fetchUserRole();
    }, [isSignedIn, user]);

    useEffect(() => {
        if (role) {
            if (role === 'caregiver') {
                router.push('/schedule');
            } else if (role === 'patient') {
                router.push('/home'); 
            } else {
                router.push('/');
            }
        }
    }, [role, router]);

    return (
        <RoleContext.Provider value={{ role }}>
            {children}
        </RoleContext.Provider>
    );
};

export default AuthProvider;
