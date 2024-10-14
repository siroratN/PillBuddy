'use client';
import React from 'react';
import { Calendar } from '@/components/ui/calendar';

const Page = () => {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	return (
		// check
		<div className="w-full flex justify-center mt-32">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-md border mx-auto"
			/>
		</div>
	);
};

export default Page;
