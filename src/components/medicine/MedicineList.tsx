'use client';
import React from 'react';
import { MedicineSchema } from '../../../drizzle/schema';
import { MedicineCardOnNotification } from '@/lib/types/db';
import { Button } from '../ui/button';

const MedicineList = ({ medicine }: { medicine: MedicineCardOnNotification }) => {
	const removeMedicine = async () => {};
	return (
		<div className="p-4 bg-blue-200 rounded flex items-center justify-between">
			<div>
				<h1 className="text-2xl font-semibold">{medicine.medicineName}</h1>
				<p>{medicine.type}</p>
				<p>{medicine.dosage}</p>
			</div>
			<div className='flex gap-2'>
				<Button variant={'secondary'}>Edit</Button>
				<Button variant={'destructive'}>Delete</Button>
			</div>
		</div>
	);
};

export default MedicineList;
