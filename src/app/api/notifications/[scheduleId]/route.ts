import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../drizzle/db';
import { notifications, schedules, patients } from '../../../../../drizzle/schema';
import { ScheduleSchema, NotificationSchema, PatientSchema } from '../../../../../drizzle/schema';
import { eq, not } from 'drizzle-orm';

export async function GET(req: NextRequest, res: NextResponse) {
	const scheduleId = req.nextUrl.href.split('/').at(-1);

	if (!scheduleId) {
		return NextResponse.json({ ok: false, message: 'Cannot find schedule id!' }, { status: 404 });
	}
	try {
		const allNotifications = await db
			.select()
			.from(notifications)
			.where(eq(notifications.schedule_id, parseInt(scheduleId)));
		return NextResponse.json({ ok: true, data: allNotifications }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ok: false, message: "Something went wrong!"}, {status: 500})
	}
}

