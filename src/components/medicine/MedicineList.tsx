'use client';
import React from 'react';
import { MedicineSchema, notifications } from '../../../drizzle/schema';
import { MedicineCardOnNotification } from '@/lib/types/db';
import { Button } from '../ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';

const MedicineList = ({ medicine }: { medicine: MedicineCardOnNotification }) => {
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
		<div className="p-4 bg-blue-200 rounded flex items-center justify-between">
			<div>
				<h1 className="text-2xl font-semibold">{medicine.medicineName}</h1>
				<p>{medicine.type}</p>
				<p>{medicine.dosage}</p>
			</div>

			<Button onClick={removeMedicine} variant={'destructive'}>
				Delete
			</Button>
		</div>
	);
};

export default MedicineList;
