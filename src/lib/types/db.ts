export type MedicineCardOnNotification = {
	medicineId: number;
	medicineName: string;
	dosage: number;
	type: string;
};

export type NotificationForm = {
	patient_id: number;
	notification_time: string;
	meal: 'morning' | 'afternoon' | 'evening' | 'bedtime';
};

export type ScheduleCardType = {
	scheduleId: string;
	caregiverName: string;
	patientName: string;
	startDate: string;
	patientAge: string;
};
