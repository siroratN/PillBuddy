import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../drizzle/db';
import { schedules } from '../../../../drizzle/schema';
import { ScheduleSchema } from '../../../../drizzle/schema';

export async function GET(req: NextRequest, res: NextResponse) {

	const allSchedules = await db.select().from(schedules);

	return NextResponse.json({
		allSchedules,
	});
}
