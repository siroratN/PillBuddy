import React from 'react';
import axios from 'axios';
import { NotificationSchema } from '../../../../../drizzle/schema';
import NotificationList from '@/components/nofitication/NotificationList';

const page = async ({ params }: { params: { id: string } }) => {
	const res = await axios.get(`${process.env.URL}/api/notifications/${params.id}`);
	const notifications = res.data.data;

	return (
		<div className="p-6">
			<div>
				
			</div>
			<div className="grid grid-cols-2 justify-items-center bg-gray-200 p-4 gap-y-4">
				{notifications.map((notification: NotificationSchema) => (
					<NotificationList key={notification.id} notification={notification} />
				))}
			</div>
		</div>
	);
};

export default page;
