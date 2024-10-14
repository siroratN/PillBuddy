'use client';
import React from 'react';
import { ScheduleSchema } from '../../../drizzle/schema';
import { useRouter } from 'next/navigation';
import { ScheduleCardType } from '@/lib/types/db';
const ScheduleCard = ({ schedule }: { schedule: ScheduleCardType }) => {
	const router = useRouter();

	return (
		<div
			key={schedule.scheduleId}
			className="bg-gray-200 p-4 cursor-pointer rounded-md"
			onClick={() => {
				return router.push(`/schedule/${schedule.scheduleId}`);
			}}
		>
			{/* <p>{schedule.caregiverName}</p> */}
			<p>{schedule.scheduleId}</p>
			<p>{schedule.patientName}</p>
			<p>{schedule.patientAge} years</p>
			<p>{schedule.startDate}</p>
		</div>
	);
};

export default ScheduleCard;
