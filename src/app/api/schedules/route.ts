import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import { caregivers, schedules } from '../../../../drizzle/schema';
import { ScheduleSchema } from '../../../../drizzle/schema';
import { NotificationSchema } from '../../../../drizzle/schema';
import { notifications } from '../../../../drizzle/schema';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { ok } from 'assert';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest, res: NextResponse) {
	const allSchedules = await db.select().from(schedules);

	return NextResponse.json({
		allSchedules,
	});
}

export async function POST(req: NextRequest, res: NextResponse) {
	const { patient_id, start_date } = await req.json();
	const user = await currentUser();

	if (!user) {
		return NextResponse.json({ ok: false }, { status: 500 });
	}

	// await db.select().from(caregivers).where(eq(caregivers.clerkID))

	await db.insert(schedules).values({ patient_id: patient_id, start_date: start_date });

	return NextResponse.json({ ok: true }, { status: 200 });
}
