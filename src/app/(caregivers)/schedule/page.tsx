import axios from 'axios';
import React from 'react';
import { ScheduleSchema } from '../../../../drizzle/schema';
import { redirect } from 'next/navigation';
import ScheduleCard from '@/components/schedule/ScheduleCard';
import AddButton from '@/components/nofitication/AddButton';
import { ScheduleCardType } from '@/lib/types/db';

const Schedules = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/schedules`);

	const schedules: ScheduleCardType[] = data.allSchedules;

	return (
		<div className='px-8 py-2'>
			<AddButton name="schedule" to={`${process.env.NEXT_PUBLIC_URL}/schedule/new`} />
			<div className="grid grid-cols-1 gap-y-4 pt-4">
				{schedules.map((schedule) => (
					<ScheduleCard key={schedule.scheduleId} schedule={schedule} />
				))}
			</div>
		</div>
	);
};

export default Schedules;
