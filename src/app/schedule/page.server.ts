import { ScheduleSchema } from "../../../drizzle/schema";

export async function getSchedule():Promise<ScheduleSchema[]> {
	const res = await fetch('http://localhost:3000/api/schedule')
	try {
		const data = await res.json()
		return data.allSchedules
	} catch {
		console.log("here")
		return []
	}
}
