'use client';
import React from 'react';
import { MedicineSchema } from '../../../drizzle/schema';
import { MedicineCardOnNotification } from '@/lib/types/db';

const MedicineList = ({ medicine }: { medicine: MedicineCardOnNotification }) => {
	return (
		<div className="p-4 bg-blue-200 rounded">
			<h1 className="text-2xl font-semibold">{medicine.medicineName}</h1>
			<p>{medicine.type}</p>
			<p>{medicine.dosage}</p>
		</div>
	);
};

export default MedicineList;
