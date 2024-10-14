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
                name: user?.fullName,
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
        <div className='mt-10 text-start max-w-xl mx-auto  p-5'>
            {error && <p className='text-red-500'>{error}</p>}
            {isSignedIn && user ? (
                <>
                    <h1 className='text-4xl font-bold text-center'>สวัสดี {user.firstName}</h1>
                    
                    <form onSubmit={handleSubmit} className="relative bg-white p-6 rounded-xl shadow-md mt-5">

                        <div className='mb-4'>
                            <label className='block mb-2'>สถานะ</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value as 'patient' | 'caregiver')}
                                required
                                className='border border-gray-300 p-2 rounded-md w-full'
                            >
                                <option value='caregiver'>ผู้ดูแล</option>
                                <option value='patient'>ผู้ป่วย</option>
                            </select>
                        </div>

                        {role === 'patient' && (
                            <div className="w-full">
                                <div className="relative">
                                    <input
                                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                        type='number'
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        required
                                    />
                                    <label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                        อายุ
                                    </label>
                                </div>
                            </div>
                        )}
                        <div className="w-full mt-5">
                            <div className="relative">
                                <input
                                    className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    type='text'
                                    value={contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    required
                                />
                                <label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                                    เบอร์โทรศัพท์
                                </label>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" className="absolute w-5 h-5 top-2.5 right-2.5 text-[#99DDCC]">
                                    <path stroke="none" d="M0 0h24v24H0z" />  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />                                </svg>
                            </div>
                        </div>

                        <div className='flex justify-center mt-8'>
                            <button type='submit' className='w-full bg-[#99DDCC] hover:bg-green-500 text-green-800 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>
                                ยืนยัน
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
