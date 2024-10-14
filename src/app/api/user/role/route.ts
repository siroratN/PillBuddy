import { NextRequest, NextResponse } from 'next/server';
import { patients, caregivers } from '../../../../../drizzle/schema'; // Adjust the import according to your structure
import { db } from '../../../../../drizzle/db'; // Adjust the import according to your structure

export async function POST(req: NextRequest) {
    try {
        const { id, role, name, age, contact_info } = await req.json();
        console.log('Role:', role);

        if (!id || !role) {
            return NextResponse.json({ message: 'ID and role are required.' }, { status: 400 });
        }

        let result;

        if (role === 'patient') {
            result = await db
                .insert(patients)
                .values({ clerkID: id, name: name, age: age, contact_info: contact_info })
                .returning();
        } else if (role === 'caregiver') {
            result = await db
                .insert(caregivers)
                .values({ clerkID: id, name: name, contact_info: contact_info })
                .returning();
        } else {
            return NextResponse.json({ message: 'Invalid role.' }, { status: 400 });
        }

        if (result) {
            return NextResponse.json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} added successfully.` }, { status: 201 });
        }

        return NextResponse.json({ message: 'Failed to add user.' }, { status: 500 });
    } catch (error) {
        console.error('Error adding user:', error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}