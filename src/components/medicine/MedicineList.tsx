'use client';
import React from 'react';
import { MedicineSchema, notifications } from '../../../drizzle/schema';
import { MedicineCardOnNotification, MedicineNotification } from '@/lib/types/db';
import { Button } from '../ui/button'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Clock, Tablets } from 'lucide-react';

const MedicineList = ({ medicine }: { medicine:MedicineNotification }) => {
	const params: { notificationId: string } = useParams();

	const removeMedicine = async () => {
		await axios
			.delete(`/api/notifications/medicine`, {
				data: {
					notificationId: params.notificationId,
					medicineId: medicine.medicineId,
				},
			})
			.then((data) => window.location.reload());
	};

	return (
		<div className="rounded-xl shadow-md border border-1 border-neutral-200 rounded ">
			<div className='flex flex-col gap-4 border-l-[14px] p-4 border-l-[#99DDCC] rounded-lg'>
			<h1 className="text-2xl font-semibold">{medicine.medicineName}</h1>
			<div className='flex flex-col gap-2 ml-2'>
				<p className='flex items-center gap-2'>
					<Clock />
					{medicine.timing}
				</p>
				<p className='flex items-center gap-2'>
					<Tablets /> {medicine.amount} pill{medicine.amount > 1 && 's'}
				</p>
			</div>
			<div className='flex gap-2 self-center'>
				<Button onClick={removeMedicine}>Done</Button>
				<Button onClick={removeMedicine} variant={'destructive'}>
					Delete
				</Button>
			</div>
			</div>
		</div>
	);
};

export default MedicineList;
