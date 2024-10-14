// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import { users, patients, caregivers } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const { id, name, email } = await req.json(); 

		console.log('Received:', id, name);

		const existingUser = await db.select().from(users).where(eq(users.clerkID, id)).execute();

        if (existingUser.length > 0) {
            return NextResponse.json({ message: 'User with this clerkID already exists' }, { status: 409 });
        }
        await db.insert(users).values({
            clerkID: id,
            name: name,
            email: email
        });
        return NextResponse.json({ message: 'Success to save user' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to save user' }, { status: 500 });
    }
}

