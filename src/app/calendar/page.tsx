'use client';
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { RoleContext } from '@/app/AuthProvider/AuthProiver';
import { useContext } from 'react';
const Page = () => {
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const { role } = useContext(RoleContext) || { role: null };

	return (
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
// kkr
export default Page;
