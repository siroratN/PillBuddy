import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import { schedules } from '../../../../drizzle/schema';
import { ScheduleSchema } from '../../../../drizzle/schema';
import { NotificationSchema } from '../../../../drizzle/schema';
import { notifications } from '../../../../drizzle/schema';

export async function GET(req: NextRequest, res: NextResponse) {
	const allSchedules = await db.select().from(schedules);

	return NextResponse.json({
		allSchedules,
	});
}

export async function POST(req: NextRequest, res: NextResponse) {
	const form: NotificationSchema = await req.json();
	const notification = await db
		.insert(notifications)
		.values({
			meal: form.meal,
			notification_time: form.notification_time,
			schedule_id: form.schedule_id,
		});
	console.log(notification)

	return NextResponse.json({ ok: true }, { status: 200 });
}
