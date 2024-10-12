'use client';
import React from 'react';
import { MedicineSchema } from '../../../drizzle/schema';

const MedicineList = ({ medicine }: { medicine: MedicineSchema }) => {
	return (
		<div className="p-4 bg-blue-200 rounded">
			<h1 className="text-2xl font-semibold">{medicine.name}</h1>
			<p>{medicine.type}</p>
			<p>{medicine.dosage}</p>
		</div>
	);
};

export default MedicineList;
