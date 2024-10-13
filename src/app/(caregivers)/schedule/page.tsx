import axios from 'axios';
import React from 'react';
import { ScheduleSchema } from '../../../../drizzle/schema';
import { redirect } from 'next/navigation';
import ScheduleCard from '@/components/schedule/ScheduleCard';
import AddButton from '@/components/nofitication/AddButton';

const Schedules = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/schedules`);

	const schedules: ScheduleSchema[] = data.allSchedules;

	return (
		<div>
			<AddButton name="schedule" to={`${process.env.NEXT_PUBLIC_URL}/schedule/new`} />
			<div className="grid grid-cols-1 gap-y-4">
				{schedules.map((schedule: ScheduleSchema) => (
					<ScheduleCard key={schedule.id} schedule={schedule} />
				))}
			</div>
		</div>
	);
};

export default Schedules;
