import axios from 'axios';
import React from 'react';
import { ScheduleSchema } from '../../../../drizzle/schema';
import { redirect } from 'next/navigation';

const Schedules = async () => {
	const {data} = await axios.get(`${process.env.URL}/api/schedules`);
    
	const scheduels: ScheduleSchema[] = data.allSchedules;

	return (
		<div>
			<div className="grid grid-cols-1 gap-y-4">
				{scheduels.map((schedule: ScheduleSchema) => (
					<div key={schedule.id} className="bg-gray-200 p-4" onClick={()=>{
                        redirect(`/schedule/${schedule.id}`)
                    }}>
						<p>{schedule.caregivers_id}</p>
						<p>{schedule.id}</p>
						<p>{schedule.patient_id}</p>
						<p>{schedule.start_date}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Schedules;
