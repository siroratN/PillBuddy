import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: NextRequest, res: NextResponse) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.json({ ok: false }, { status: 500 });
	}
	const userId = user.id;
	console.log(userId)
	return NextResponse.json({ message: 'Task is scheduled to run every minute.' });
}
