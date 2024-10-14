import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import { caregivers, patients, schedules } from '../../../../drizzle/schema';
import { ScheduleSchema } from '../../../../drizzle/schema';
import { NotificationSchema } from '../../../../drizzle/schema';
import { notifications } from '../../../../drizzle/schema';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { ok } from 'assert';
import { eq } from 'drizzle-orm';
import { schedule } from 'node-cron';

export async function GET(req: NextRequest, res: NextResponse) {
	const allSchedules = await db
		.select({
			scheduleId: schedules.id,
			caregiverName: caregivers.name,
			patientName: patients.name,
			patientAge: patients.age,
			startDate: schedules.start_date,
		})
		.from(schedules)
		.innerJoin(patients, eq(patients.id, schedules.patient_id))
		.innerJoin(caregivers, eq(caregivers.id, schedules.caregivers_id));
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

	console.log(user.id);

	const data = await db
		.select({ id: caregivers.id })
		.from(caregivers)
		.where(eq(caregivers.clerkID, user.id));

	if (!data) {
		return NextResponse.json({ ok: false }, { status: 500 });
	}

	const caregiversId = data[0].id;

	try {
		await db
			.insert(schedules)
			.values({ patient_id: patient_id, start_date: start_date, caregivers_id: caregiversId });
	} catch (err) {
		return NextResponse.json({ ok: false, message: err }, { status: 500 });
	}

	return NextResponse.json({ ok: true }, { status: 200 });
}
