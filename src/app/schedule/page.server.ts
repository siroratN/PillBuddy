import { db } from "../../../drizzle/db";
import { schedules } from "../../../drizzle/schema";

export async function getSchedule(){
    return await db.select().from(schedules);
}