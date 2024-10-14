import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../drizzle/db';
import {
	medicines,
	NotificationMedicinesSchema,
	NotificationSchema,
} from '../../../../../drizzle/schema';
import { notifications } from '../../../../../drizzle/schema';
import { notification_medicines } from '../../../../../drizzle/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(req: NextRequest, res: NextResponse) {
	const form: NotificationMedicinesSchema = await req.json();
	const past_medicines = await db
		.select({ id: notification_medicines.medicine_id })
		.from(notification_medicines)
		.where(eq(notification_medicines.notification_id, form.notification_id));

	if (past_medicines.some((med) => med.id === form.medicine_id)) {
		return NextResponse.json({ ok: false, message: 'Already has this medicine.' }, { status: 403 });
	}
	await db.insert(notification_medicines).values({
		timing: form.timing,
		dosage_amount: form.dosage_amount,
		medicine_id: form.medicine_id,
		notification_id: form.notification_id,
	});

	return NextResponse.json({ ok: true }, { status: 200 });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
	const { notificationId, medicineId } = await req.json();

	try {
		await db
			.delete(notification_medicines)
			.where(
				and(
					eq(notification_medicines.notification_id, notificationId),
					eq(notification_medicines.medicine_id, medicineId)
				)
			);
	} catch (err) {
		return NextResponse.json({ ok: false, message: err }, { status: 403 });
	}
	return NextResponse.json({ ok: true }, { status: 200 });
}

export async function PATCH(req: NextRequest, res: NextResponse) {
	const { data } = await req.json();
	const medicineInNotiId = data.medicineInNotiId;
	if (!medicineInNotiId) {
		return NextResponse.json({ ok: false, message: 'Notification not found!' }, { status: 200 });
	}
	try {
		const takeMedicine = await db
			.update(notification_medicines)
			.set({ success: true })
			.where(eq(notification_medicines.id, medicineInNotiId))
			.execute();
			console.log(takeMedicine)
		return NextResponse.json({ ok: true, data: takeMedicine }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ ok: false }, { status: 403 });
	}
}
