import { db } from "../../../../../drizzle/db";
import {
  medicines,
  notification_medicines,
  notifications,
} from "../../../../../drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { asc, gt, eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const currentTime = new Date().toTimeString().split(" ")[0];
    console.log(currentTime);
    const closestNotification = await db
      .select({
        id: notifications.id,
        // mediOnNotiId : notification_medicines.id,
        time: notifications.notification_time,
        medicine: medicines.name, // ดึงข้อมูลยาเป็นแถวแยกกัน
        amount: notification_medicines.dosage_amount,
        timing: notification_medicines.timing,
        meal: notifications.meal,
      })
      .from(notifications)
      .where(gt(notifications.notification_time, currentTime))
      .leftJoin(
        notification_medicines,
        eq(notifications.id, notification_medicines.notification_id)
      )
      .leftJoin(medicines, eq(notification_medicines.medicine_id, medicines.id))
      .orderBy(asc(notifications.notification_time))
      .limit(1);


    const { id } = closestNotification[0];


    const allMedicines = await db
      .select()
      .from(medicines)
      .leftJoin(
        notification_medicines,
        eq(notification_medicines.medicine_id, medicines.id)
      )
      .leftJoin(
        notifications,
        eq(notification_medicines.notification_id, notifications.id)
      )
      .where(eq(notifications.id, id));

    console.log(allMedicines);

    if (closestNotification.length > 0) {
      console.log(closestNotification[0]);
      return NextResponse.json({
        closestNotification: closestNotification[0],
        allMedicines: allMedicines,
      });
    } else {
      return NextResponse.json(
        { message: "No upcoming notifications found." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
