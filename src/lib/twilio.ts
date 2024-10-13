'use server';

import twilio from 'twilio';

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
export const client = twilio(accountSid, authToken);

export async function createMessage(to: string, body: string) {
	const message = await client.messages.create({
		body: body,
		from: '+19093435505',
		to: to,
	});

	console.log(message.body);
}
