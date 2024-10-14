import { Button } from '@/components/ui/button';
import React from 'react';
import NotificationAddButton from '@/components/nofitication/AddButton';
import { MedicineSchema } from '../../../../../drizzle/schema';
import axios from 'axios';
import MedicineList from '@/components/medicine/MedicineList';
import { MedicineCardOnNotification, MedicineNotification } from '@/lib/types/db';
import MedicineForm from '@/components/medicine/MedicineForm';
import AddMedicine from '@/components/medicine/AddMedicine';

const page = async ({ params }: { params: { notificationId: string } }) => {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/medicines/${params.notificationId}`);
	const medicines = res.data.data;
	console.log(medicines)
	return (
		<div className="p-6">
			<AddMedicine notificationId={params.notificationId}/>
			<div className="w-full flex flex-col gap-4 mt-10 rounded-md">
				{medicines.map((medicine: MedicineNotification) => (
					<MedicineList key={medicine.medicineId} medicine={medicine} />
				))}
			</div>
		</div>
	);
};

export default page;
