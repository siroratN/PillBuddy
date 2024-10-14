import { NextRequest, NextResponse } from 'next/server';
import { MedicineSchema, notification_medicines, notifications } from '../../../../../drizzle/schema';
import { medicines } from '../../../../../drizzle/schema';
import { db } from '../../../../../drizzle/db';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest, res: NextResponse) {
	const notificationId = req.nextUrl.href.split('/').at(-1);
	if (!notificationId) {
		return NextResponse.json({ ok: false, message: 'Notification not found!' }, { status: 200 });
	}
	const allMedicines = await db
            .select({
                medicineId: medicines.id,
                medicineName: medicines.name,
                dosage: medicines.dosage,
                type: medicines.type,
                timing: notification_medicines.timing,
                amount: notification_medicines.dosage_amount
            })
            .from(medicines)
            .innerJoin(notification_medicines, eq(notification_medicines.medicine_id, medicines.id))
            .innerJoin(notifications, eq(notification_medicines.notification_id, notifications.id))
            .where(eq(notifications.id, parseInt(notificationId)));

	return NextResponse.json({ ok: true, data: allMedicines }, { status: 200 });
}
