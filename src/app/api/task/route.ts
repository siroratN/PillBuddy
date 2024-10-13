import { client } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

async function createMessage() {
	const message = await client.messages.create({
		body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
		from: '+19093435505',
		to: '+66917584445',
	});

	console.log(message.body);
}

export async function GET(req: NextRequest, res: NextResponse) {
	createMessage();

	return NextResponse.json(
		{
			ok: true,
		},
		{ status: 200 }
	);
}
