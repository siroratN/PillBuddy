import ScheduleForm from '@/components/schedule/ScheduleForm';
import React from 'react';

const page = () => {
	return (
		<div>
			<div className='flex flex-col w-fit mx-auto mt-10'>
				<h1 className='text-2xl font-semibold'>Create schedule</h1>
				<ScheduleForm />
			</div>
		</div>
	);
};

export default page;
