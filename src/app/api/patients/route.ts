import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import { notifications, schedules, patients } from '../../../../drizzle/schema';
import { ScheduleSchema, NotificationSchema, PatientSchema } from '../../../../drizzle/schema';

export async function GET(req: NextRequest, res:NextResponse){
    const allPatients = await db.select().from(patients)
    return NextResponse.json(allPatients)
}