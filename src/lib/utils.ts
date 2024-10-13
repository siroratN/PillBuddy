import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import twilio from 'twilio';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Download the helper library from https://www.twilio.com/docs/node/install

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
export const client = twilio(accountSid, authToken);


export async function createMessage(to:string, body:string) {
	const message = await client.messages.create({
		body: body,
		from: '+19093435505',
		to: to,
	});

	console.log(message.body);
}


// export const url = 'localhost:3000'
