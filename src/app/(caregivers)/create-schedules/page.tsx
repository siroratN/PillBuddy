import CreateScheduleForm from '@/components/schedule/CreateScheduleForm';
import React, { useState } from 'react';
import axios from 'axios';
import { PatientSchema } from '../../../../drizzle/schema';


const page = async () => {
	return (
		<div>
			<CreateScheduleForm/>
		</div>
	);
};

export default page;
