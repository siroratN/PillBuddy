import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

let interval: NodeJS.Timeout | null = null;

export async function GET(req: NextRequest, res:NextResponse) {
	if (!interval) {
		interval = setInterval(() => {
			console.log('Task is running every minute!');

			// ส่ง notification
			
		}, 60*1000); // 1 minute
	}
	return NextResponse.json({ message: 'Task is scheduled to run every minute.' });
}
