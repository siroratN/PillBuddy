'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormControl, FormLabel, FormItem, FormMessage } from '../ui/form';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import axios from 'axios';
import { MedicineSchema } from '../../../drizzle/schema';
import { PatientSchema } from '../../../drizzle/schema';

const ScheduleForm = () => {
	const scheduleSchema = z.object({
		patient_id: z.coerce.number(),
		start_date: z.string().date(),
	});

	const form = useForm<z.infer<typeof scheduleSchema>>({
		resolver: zodResolver(scheduleSchema),
	});

	const onSubmit = async (values: z.infer<typeof scheduleSchema>) => {
		await axios
			.post(`/api/schedules`, values)
			.then((data) => window.location.reload())
			.catch((data) => alert(data));
	};

	const [patients, setPatients] = useState<PatientSchema[]>([]);
	useEffect(() => {
		axios.get('/api/patients').then((res) => setPatients(res.data.data));
	}, []);

	return (
		<div className="max-w-lg mx-auto mt-10">
			<Form {...form}>
				<form action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="patient_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg">Patient</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue="field.value">
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a fruit" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{patients.map((patient) => (
													<SelectItem key={patient.id} value={patient.id + ''}>
														{patient.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="start_date"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-lg">Start date</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="mt-4 w-24">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ScheduleForm;
