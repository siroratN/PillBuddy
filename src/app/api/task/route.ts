import { createScheduledDateTime, getCurrentTime } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import {
	notification_medicines,
	notifications,
	patients,
	schedules,
} from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import twilio from 'twilio';

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage(to: string, body: string) {
	const message = await client.messages.create({
		body: body,
		from: '+19093435505',
		to: to,
	});

	console.log(message.body);
}

export async function GET(req: NextRequest, res: NextResponse) {
	const eachUserNotifications = await db
		.select({
			patientName: patients.name, // ดึงชื่อผู้ป่วย
			patientPhone: patients.phone_number,
			scheduleId: schedules.id, // ดึง ID ตาราง schedule
			notificationTime: notifications.notification_time, // เวลาที่ต้องแจ้งเตือน
			notificationStatus: notifications.notification_status, // สถานะการแจ้งเตือน
			meal: notifications.meal, // มื้ออาหารที่เกี่ยวข้อง
		})
		.from(notifications)
		.leftJoin(schedules, eq(schedules.id, notifications.schedule_id))
		.leftJoin(patients, eq(patients.id, schedules.patient_id)); // Join ตาราง schedules กับ patients เพื่อดึงข้อมูลของทุกคน

	eachUserNotifications.forEach((noti) => {
		if (noti.notificationTime.slice(0, -3) == getCurrentTime().slice(0, -3)) {
			createMessage(
				noti.patientPhone || '+66917584445',
				`Time to take your medicine! Stay healthy and follow your schedule. \n`
			);
		}
	});

	return NextResponse.json(
		{
			ok: true,
		},
		{ status: 200 }
	);
}
