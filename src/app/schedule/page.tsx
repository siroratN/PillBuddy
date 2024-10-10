import React from 'react'
import { getSchedule } from './page.server'
import { ScheduleSchema } from '../../../drizzle/schema'

const Schedule = async () => {
    const data = await getSchedule()
  return (
    <div>
        {
            data.map((schedule: ScheduleSchema) =>(
                <div key={schedule.id}>{schedule.date}</div>
            ))
        }
    </div>
  )
}

export default Schedule
