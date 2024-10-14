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

export type MedicineType = {
	name: string;
	amount: number;
	timing: string | null;
};

export type NotificationType = {
	id: number;
	time: string;
	meal: 'morning' | 'afternoon' | 'evening' | 'bedtime' | null;
	medicines: MedicineType[];
};

export type CurrentNotificationType = {
	id: number;
	time: string;
	medicine: string;
	amount: number;
	timing: string | null;
	meal: 'morning' | 'afternoon' | 'evening' | 'bedtime' | null;
};

export type MedicineNotification = {
	medicineId: number;
	medicineInNotiId: number;
	medicineName: string;
	dosage: string | null;
	type: string;
	timing: string | null;
	amount: number;
	success: boolean;
};
