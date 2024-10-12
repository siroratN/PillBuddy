'use client';
import React from 'react';
import { NotificationSchema } from '../../../drizzle/schema';

const NotificationList = ({ notification }: { notification: NotificationSchema }) => {
	return (
		<div key={notification.id} className="p-4 place-items-center bg-neutral-400 w-32">
			<p className="text-xl font-semibold">{notification.meal}</p>
			<p className="text-gray-500">{notification.notification_status}</p>
			<p className="text-gray-500">{notification.notification_time}</p>
		</div>
	);
};

export default NotificationList;
