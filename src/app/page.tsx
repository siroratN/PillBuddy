'use server'
import { Button } from '@/components/ui/button';
import { db } from '../../drizzle/db';
import { users } from '../../drizzle/schema';
import { UserSchema } from '../../drizzle/schema';

export default async function HomePage() {
  // Query ข้อมูลจากตาราง users
  const allUsers = await db.select().from(users);

  return (
    <div className='h-[3000px]'>
      <h1>Users List</h1>
      <ul>
        {allUsers.map((user:UserSchema) => (
          <li key={user.id}>
            {user.id} - {user.name}
          </li>
        ))}
        <Button variant={'secondary'}>Click me!</Button>
      </ul>
    </div>
  );
}