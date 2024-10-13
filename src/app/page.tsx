'use server'
import { Button } from '@/components/ui/button';
import { db } from '../../drizzle/db';
import { auth, currentUser } from '@clerk/nextjs/server'; // Server-side imports
import axios from 'axios';

export default async function HomePage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        return <div>You are not logged in</div>;
    }
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            id: user.id,
            name: user.firstName
        });

        if (response.status === 201) {
            console.log('User saved to database');
        }
    } catch (error) {
        console.log('Error fetching user data:', error);
    }

    return (
        <div className='mt-10 text-start max-w-xl mx-auto bg-neutral-200 p-5 rounded'>
            <h1 className='text-4xl font-bold text-center'>Welcome, {user.firstName}</h1>
        </div>
        
    );
}