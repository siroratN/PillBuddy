import NotificationForm from '@/components/nofitication/NotificationForm';
import React, { useState } from 'react';
import axios from 'axios';
import { PatientSchema } from '../../../../../drizzle/schema';


const page = async () => {
	return (
		<div className='px-6'>
			<NotificationForm/>
		</div>
	);
};

export default page;
