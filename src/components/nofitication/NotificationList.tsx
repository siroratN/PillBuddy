'use client';
import React, { useContext } from 'react';
import { medicines, NotificationSchema } from '../../../drizzle/schema';
import { useRouter } from 'next/navigation';
import { RoleContext } from '@/app/AuthProvider/page';
import { NotificationType } from '@/lib/types/db';

const NotificationList = ({ notification }: { notification: NotificationType }) => {
	const router = useRouter();
	// const { role } = useContext(RoleContext);
	let total = 0;
	return (
		<div
			key={notification.id}
			className="p-4 cursor-pointer w-92 bg-[#fdfdff] rounded-xl h-[200px] border shadow-md flex flex-col justify-between"
			onClick={() => {
				router.push(`/notification/${notification.id}`);
			}}
		>
			<div>
				{/* {role} */}
				<p className="text-xl font-bold">Next reminder at {notification.time.slice(0, -3)}</p>
				<ul className="list-disc pl-8 mt-4">
					{notification.medicines.map((pill) => {
						total += pill.amount || 0;
						return (
							<li key={pill.name} className="text-lg">
								{pill.name} {pill.amount || 1} {pill.amount == 1 ? 'pill' : 'pills'} {pill.timing}
							</li>
						);
					})}
				</ul>
			</div>

			<p className="text-center ">
				{notification.meal} total {total} pills
			</p>
		</div>
	);
};

export default NotificationList;
