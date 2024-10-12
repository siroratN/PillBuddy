import { Button } from '@/components/ui/button';
import React from 'react';
import NotificationAddButton from '@/components/nofitication/NotificationAddButton';
import { MedicineSchema } from '../../../../../drizzle/schema';
import axios from 'axios';
import MedicineList from '@/components/medicine/MedicineList';

const page = async ({ params }: { params: { notificationId: string } }) => {
	const res = await axios.get(`${process.env.URL}/api/medicines/${params.notificationId}`);
	const medicines = res.data.data;
	return (
		<div className="p-6">
			<NotificationAddButton />
			<div className="w-full flex flex-col gap-4 mt-10 rounded-md">
				{medicines.map((medicine: MedicineSchema) => (
					<MedicineList key={medicine.id} medicine={medicine} />
				))}
			</div>
		</div>
	);
};

export default page;
