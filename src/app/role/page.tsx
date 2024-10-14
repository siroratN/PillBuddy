'use client';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function RoleSelectionPage() {
    const { userId, isSignedIn } = useAuth();
    const { user } = useUser();
    const [role, setRole] = useState('');
    const [age, setAge] = useState('');
    const [Phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); 


    useEffect(() => {
        if (!isSignedIn) {
            setError('You are not logged in');
        }
    }, [isSignedIn]);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) return;

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user/role`, {
                id: userId,
                role,
                name: user?.fullName,
                age: role === 'patient' ? age : null, // Set to null for caregivers
                contact_info: user?.primaryEmailAddress?.emailAddress,
                phone_number: Phone
            });

            if (response.status == 201) {
                console.log('Success');
                router.push('/AuthProvider');
            }
            
        } catch (error) {
            console.log('Error saving user data:', error);
            setError('Failed to save user data. Please try again.');
        }
    };

    return (
        <div className='mt-10 text-start max-w-xl mx-auto p-5'>
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
                                <option value='select'>---</option>
                                <option value='caregiver'>ผู้ดูแล</option>
                                <option value='patient'>ผู้ป่วย</option>
                            </select>
                        </div>

                        {role === 'patient' && (
                            <>
                            <div className="w-full mb-4">
                                <label className="block mb-2">อายุ</label>
                                <input
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    type='number'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    />
                            </div>
                            <div className="w-full mt-5">
                            <label className="block mb-2">เบอร์โทรศัพท์</label>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                type='tel'
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className='flex justify-center mt-8'>
                            <button type='submit' className='w-full bg-[#99DDCC] hover:bg-green-500 text-green-800 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>
                                ยืนยัน
                            </button>
                        </div>
                            </>
                        )}
                        {role === 'caregiver' && (
                            <>

                            <div className="w-full mt-5">
                            <label className="block mb-2">เบอร์โทรศัพท์</label>
                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                type='tel'
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className='flex justify-center mt-8'>
                            <button type='submit' className='w-full bg-[#99DDCC] hover:bg-green-500 text-green-800 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>
                                ยืนยัน
                            </button>
                        </div>
                            </>
                        )}

                        
                    </form>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
