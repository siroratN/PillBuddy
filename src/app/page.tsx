'use client'; // ทำให้คอมโพเนนต์นี้ทำงานในฝั่งไคลเอนต์
import React, { useEffect,createContext, useContext, useState, } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const { isSignedIn } = useAuth(); 
    const { user } = useUser();
    const router = useRouter(); 

    useEffect(() => {
        const saveUserToDatabase = async () => {
            if (isSignedIn && user) {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
                        id: user.id,
                        name: user.fullName,
                        email: user.primaryEmailAddress?.emailAddress,
                    });

                    if (response.status == 201) {
                        console.log('User saved to database');
                        router.push('/role');
                    }
                    else if (response.status == 200) { 
                        console.log('jjj')
                        router.push('/AuthProvider');
                    }
                } catch (error) {
                    console.log('Error fetching user data:', error);
                }
            }
        };

        saveUserToDatabase();
    }, [isSignedIn, user, router]);

    return (
        <div className='mt-10 text-start max-w-xl mx-auto bg-neutral-200 p-5 rounded'>
            {user ? (
                <h1 className='text-4xl font-bold text-center'>Welcome, {user.firstName}</h1>
            ) : (
                <h1 className='text-4xl font-bold text-center'>Welcome, Guest</h1>
            )}
        </div>
    );
};

export default HomePage;
