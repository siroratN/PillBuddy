import cron from 'node-cron';
import { db } from './drizzle/db'; // สมมติว่ามี lib/db สำหรับเชื่อมต่อฐานข้อมูล
import { notifications } from './drizzle/schema';
import { eq } from 'drizzle-orm';
// import { sendNotification } from './lib/notificationService'; // ฟังก์ชันส่งแจ้งเตือน

// ตั้งค่า Cron Job ให้รันทุกๆ 1 นาที
cron.schedule('* * * * *', async () => {
	const currentTime = new Date().toTimeString().split(' ')[0]; // ดึงเวลาปัจจุบันในรูปแบบ HH:MM:SS

	// ดึงข้อมูลการแจ้งเตือนที่ตรงกับเวลาปัจจุบันและยังไม่ได้ส่ง
	const allNotifications = await db
		.select()
		.from(notifications)
		.where(eq(notifications.notification_time, currentTime));

	// ส่งการแจ้งเตือน
	for (const notification of allNotifications) {
		console.log('SDK:FJDSFJKJSVCXK:LJ:KLSDFLNDSFLIUEWJNFLIJNVXCKJVNDSs');
	}

	console.log('Notifications sent successfully at', currentTime);
});
