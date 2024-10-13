// app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db'; // Connect to the database
import { users } from '../../../../drizzle/schema'; // Connect to the schema

export async function POST(req: NextRequest) {
    
    try {
        const { id, name } = await req.json(); // Destructure id, name, and email from the request body

        console.log(id,name)
        await db.insert(users).values({
            clerkID:id,
            name:name,
        });

        return NextResponse.json({ message: 'User saved to database' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to save user' }, { status: 500 });
    }
}
