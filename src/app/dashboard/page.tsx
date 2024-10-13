import { auth, currentUser } from '@clerk/nextjs/server'; // Server-side imports
import axios from 'axios';

export default async function DashboardPage() {
  const { userId } = await auth(); // Get the userId from Clerk's auth
  const user = await currentUser(); // Get the current user information

  if (!userId || !user) {
      return <div>You are not logged in</div>;
  }

  try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
          id: user.id,
          name: user.firstName
      });

      if (response.status === 201) {
          console.log('User saved to database');
      } else {
          console.error('Failed to save user to database');
      }
  } catch (error) {
      console.error('Error fetching user data:', error);
  }

  return (
      <div className='mt-10 text-start max-w-xl mx-auto bg-neutral-200 p-5 rounded'>
          <h1 className='text-4xl font-bold text-center'>Welcome, {user.firstName}</h1>
      </div>
  );
}