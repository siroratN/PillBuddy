import { Button } from '@/components/ui/button';
import React from 'react';
import NotificationAddButton from '@/components/nofitication/AddButton';
import { MedicineSchema } from '../../../../../drizzle/schema';
import axios from 'axios';
import MedicineList from '@/components/medicine/MedicineList';
import { MedicineCardOnNotification } from '@/lib/types/db';
import MedicineForm from '@/components/medicine/MedicineForm';

const page = async ({ params }: { params: { notificationId: string } }) => {
	const res = await axios.get(`${process.env.URL}/api/medicines/${params.notificationId}`);
	const medicines = res.data.data;
	return (
		<div className="p-6">
			<div className="w-full flex flex-col gap-4 mt-10 rounded-md">
				{medicines.map((medicine: MedicineCardOnNotification) => (
					<MedicineList key={medicine.medicineId} medicine={medicine} />
				))}
			</div>
			<MedicineForm notificationId={params.notificationId}/>
		</div>
	);
};

export default page;
