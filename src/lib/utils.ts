import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import twilio from 'twilio';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Download the helper library from https://www.twilio.com/docs/node/install

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure



export function createScheduledDateTime(hour: number, minute: number) {
	const now = new Date(); // สร้าง Date สำหรับวันที่ปัจจุบัน
	const scheduledDateTime = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		hour,
		minute,
		0 // ตั้งวินาทีเป็น 0
	);

	return scheduledDateTime;
}


export const getCurrentTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};
// export const url = 'localhost:3000'
