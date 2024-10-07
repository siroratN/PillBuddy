'use server'
import { db } from '../../drizzle/db';
import { users } from '../../drizzle/schema';

export default async function HomePage() {
  // Query ข้อมูลจากตาราง users
  const allUsers = await db.select().from(users);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {allUsers.map((user:any) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}