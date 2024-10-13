'use client';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';

export default function RoleSelectionPage() {
    const { userId, isSignedIn } = useAuth(); 
    const { user } = useUser();
    const [role, setRole] = useState('');
    const [age, setAge] = useState('');
    const [contactInfo, setContactInfo] = useState(''); 
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isSignedIn) {
            setError('You are not logged in');
        }
    }, [isSignedIn]);

    const handleSubmit = async () => {

        if (!userId) return;

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user/role`, {
                id: userId,
                role,
                name: user?.firstName,
                age,
                contact_info: contactInfo,
            });

            if (response.status === 200 || response.status === 204) {
                console.log('User role updated successfully');
            }
        } catch (error) {
            console.log('Error saving user data:', error);
            setError('Failed to save user data. Please try again.');
        }
    };

    return (
        <div className='mt-10 text-start max-w-xl mx-auto bg-neutral-200 p-5 rounded'>
            {error && <p className='text-red-500'>{error}</p>}
            {isSignedIn && user ? (
                <>
                    <h1 className='text-4xl font-bold text-center'>Welcome {user.firstName}</h1>
                    <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
                        <h2 className='text-lg font-semibold mb-4'>Select Role</h2>
                        <div className='mb-4'>
                            <label className='block mb-2'>Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value as 'patient' | 'caregiver')}
                                required
                                className='border border-gray-300 p-2 rounded-md w-full'
                            >
                                <option value=''>Select Role</option>
                                <option value='patient'>Patient</option>
                                <option value='caregiver'>Caregiver</option>
                            </select>
                        </div>

                        {role === 'patient' && (
                            <div className='mb-4'>
                                <label className='block mb-2'>Age</label>
                                <input
                                    type='number'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    className='border border-gray-300 p-2 rounded-md w-full'
                                />
                            </div>
                        )}

                        <div className='mb-4'>
                            <label className='block mb-2'>Contact Info</label>
                            <input
                                type='text'
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}
                                required
                                className='border border-gray-300 p-2 rounded-md w-full'
                            />
                        </div>

                        <button type='submit' className='bg-green-600 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded shadow-md border-none'>
                            Submit
                        </button>
                    </form>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
