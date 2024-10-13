'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import MedicineForm from './MedicineForm';

const AddMedicine = ({ notificationId }: { notificationId: string }) => {
	const [formOpen, setFormOpen] = useState(false);

	return (
		<div>
			<Button
				onClick={() => {
					setFormOpen(!formOpen);
				}}
			>
				Add Medicine
			</Button>
			{formOpen && <MedicineForm notificationId={notificationId} />}
		</div>
	);
};

export default AddMedicine;
