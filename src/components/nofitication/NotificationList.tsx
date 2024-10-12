'use client';
import React from 'react';
import { NotificationSchema } from '../../../drizzle/schema';
import { useRouter } from 'next/navigation';

const NotificationList = ({ notification }: { notification: NotificationSchema }) => {
    const router = useRouter()
	return (
		<div key={notification.id} className="p-4 cursor-pointer place-items-center bg-neutral-400 w-32" onClick={()=>{
            router.push(`/notification/${notification.id}`)
        }}>
			<p className="text-xl font-semibold">{notification.meal}</p>
			<p className="text-gray-500">{notification.notification_status}</p>
			<p className="text-gray-500">{notification.notification_time}</p>
		</div>
	);
};

export default NotificationList;
