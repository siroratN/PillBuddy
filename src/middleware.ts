import { authMiddleware, clerkMiddleware } from '@clerk/nextjs/server';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const middleware = (req: NextRequest, event: NextFetchEvent) => {
	// ตรวจสอบว่า URL คือ https://console.cron-job.org/jobs หรือไม่
	if (req.nextUrl.pathname === '/jobs' && req.nextUrl.hostname === 'console.cron-job.org') {
		// ให้เข้าถึง URL นี้โดยไม่ต้องผ่านการตรวจสอบสิทธิ์
		return NextResponse.next();
	}

	// เรียกใช้งาน clerkMiddleware เพื่อตรวจสอบสิทธิ์สำหรับเส้นทางที่เหลือ
	return clerkMiddleware(req, event);
};

export default middleware;

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
