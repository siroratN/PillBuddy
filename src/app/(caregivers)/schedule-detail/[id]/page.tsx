import React from 'react';
import axios from 'axios';
import { NotificationSchema } from '../../../../../drizzle/schema';


const page = async ({ params }: { params: { id: string } }) => {
	const res = await axios.get(`${process.env.URL}/api/notifications/${params.id}`);
	const notifications = res.data.data

	return <div className='p-6'>
		<div className='grid grid-cols-2 justify-items-center bg-gray-200 p-4 gap-y-4'>
			{notifications.map((notification:NotificationSchema) =>
				<div key={notification.id} className='p-4 place-items-center bg-neutral-400 w-32'>
					<p className='text-xl font-semibold'>{notification.meal}</p>
					<p className='text-gray-500'>{notification.notification_status}</p>
					<p className='text-gray-500'>{notification.notification_time}</p>
				</div>
			)}
		</div>
	</div>;
};

export default page;
