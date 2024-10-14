import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import { patients, schedules } from '../../../../drizzle/schema';
import { ScheduleSchema } from '../../../../drizzle/schema';
import { NotificationSchema } from '../../../../drizzle/schema';
import { notifications } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { NotificationForm } from '@/lib/types/db';

export async function POST(req: NextRequest, res: NextResponse) {
	const form: NotificationForm = await req.json();

	const scheduleQuery = await db
		.select({ id: schedules.id })
		.from(patients)
		.where(eq(patients.id, form.patient_id))
		.innerJoin(schedules, eq(schedules.patient_id, patients.id))
		.limit(1);

	if (!scheduleQuery) {
		return NextResponse.json({ ok: false }, { status: 403 });
	}

	const { id: scheduleId } = scheduleQuery[0];

	const notification = await db
		.insert(notifications)
		.values({
			meal: form.meal,
			notification_time: form.notification_time,
			schedule_id: scheduleId,
		})
		.returning();
	console.log(notification);

	return NextResponse.json({ ok: notification }, { status: 200 });
}
