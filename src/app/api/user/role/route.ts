import { NextRequest, NextResponse } from 'next/server';
import { patients, caregivers, users } from '../../../../../drizzle/schema'; // Adjust the import according to your structure
import { db } from '../../../../../drizzle/db'; // Adjust the import according to your structure
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
        const { id, role, name, age, contact_info, phone_number } = await req.json();
        console.log('Role:', role);

        if (!id || !role) {
            return NextResponse.json({ message: 'ID and role are required.' }, { status: 400 });
        }

        if (role) {
            await db.update(users)
                    .set({ role: role })
                    .where(eq(users.clerkID, id))
                    .execute();
        }

        let result;

        if (role === 'patient') {
            result = await db
                .insert(patients)
                .values({ clerkID: id, name: name, age: age, contact_info: contact_info, phone_number: phone_number })
                .returning();
                return NextResponse.json({ message: `Patient added successfully.` }, { status: 201 });

        } else if (role === 'caregiver') {
            result = await db
                .insert(caregivers)
                .values({ clerkID: id, name: name, contact_info: contact_info, phone_number: phone_number })
                .returning();
                return NextResponse.json({ message: `Caregiver added successfully.` }, { status: 201 });
        } 
        else {
            return NextResponse.json({ message: 'Invalid role.' }, { status: 400 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const clerkID = searchParams.get('clerkID'); 

    if (!clerkID) {
        return NextResponse.json({ error: 'clerkID is required' }, { status: 400 });
    }

    try {
        const user = await db.select().from(users).where(eq(users.clerkID, clerkID));

        if (user.length > 0) {
            const userRole = user[0].role;
            return NextResponse.json({ role: userRole }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
