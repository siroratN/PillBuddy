import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../drizzle/db';
import {
	notifications,
	schedules,
	patients,
	notification_medicines,
	medicines,
} from '../../../../../drizzle/schema';
import { ScheduleSchema, NotificationSchema, PatientSchema } from '../../../../../drizzle/schema';
import { eq, not } from 'drizzle-orm';

export async function GET(req: NextRequest, res: NextResponse) {
	const scheduleId = req.nextUrl.href.split('/').at(-1);
	console.log("num", scheduleId)

	if (!scheduleId) {
		return NextResponse.json({ ok: false, message: 'Cannot find schedule id!' }, { status: 404 });
	}
	try {
		const allNotifications = await db
			.select({
				id: notifications.id,
				time: notifications.notification_time,
				medicine: medicines.name, // ดึงข้อมูลยาเป็นแถวแยกกัน
				amount: notification_medicines.dosage_amount,
				timing: notification_medicines.timing,
				meal: notifications.meal
			})
			.from(notifications)
			.where(eq(notifications.schedule_id, parseInt(scheduleId)))
			.leftJoin(
				notification_medicines,
				eq(notifications.id, notification_medicines.notification_id)
			)
			.leftJoin(medicines, eq(notification_medicines.medicine_id, medicines.id))
			.orderBy(notifications.id, notifications.notification_time);
	
			// console.log(allNotifications)
		return NextResponse.json({ ok: true, data: allNotifications }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ ok: false, message: 'Something went wrong!' }, { status: 500 });
	}
}
