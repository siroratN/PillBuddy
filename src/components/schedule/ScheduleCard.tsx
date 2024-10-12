'use client';
import React from 'react';
import { ScheduleSchema } from '../../../drizzle/schema';
import { useRouter } from 'next/navigation';
const ScheduleCard = ({ schedule }: { schedule: ScheduleSchema }) => {

    const router = useRouter()

	return (
		<div
			key={schedule.id}
			className="bg-gray-200 p-4 cursor-pointer"
			onClick={() => {
				return router.push(`/schedule/${schedule.id}`);
			}}
		>
			<p>{schedule.caregivers_id}</p>
			<p>{schedule.id}</p>
			<p>{schedule.patient_id}</p>
			<p>{schedule.start_date}</p>
		</div>
	);
};

export default ScheduleCard;
