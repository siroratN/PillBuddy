'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormField,
	FormControl,
	FormLabel,
	FormItem,
	FormDescription,
	FormMessage,
} from '../ui/form';

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

const MedicineForm = ({
	notificationId,
}: {
	notificationId: string;
	
}) => {
	const scheduleSchema = z.object({
		notification_id: z.coerce.number(),
		medicine_id: z.coerce.number(),
		dosage_amount: z.coerce.number().int().gt(0),
	});

	const form = useForm<z.infer<typeof scheduleSchema>>({
		resolver: zodResolver(scheduleSchema),
		defaultValues: {
			notification_id: parseInt(notificationId),
		},
	});

	const onSubmit = async (values: z.infer<typeof scheduleSchema>) => {
		console.log(values)
		await axios
			.post(`/api/notifications/medicine`, values)
			.then((data) => window.location.reload())
			.catch(data=>alert(data));
	};

	const [medicines, setMedicines] = useState<MedicineSchema[]>([]);
	useEffect(() => {
		axios.get('/api/medicines').then((res) => setMedicines(res.data.data));
	}, []);

	return (
				<div className="max-w-lg mx-auto mt-10">
					<Form {...form}>
						<form action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="notification_id"
								render={({ field }) => (
									<FormItem className="hidden">
										<FormLabel className="text-lg">Notification</FormLabel>
										<FormControl>
											<Input type="number" className="text-black" defaultValue={field.value} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="medicine_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg">Medicine</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue="field.value">
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Select a fruit" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Medicines</SelectLabel>
														{medicines.map((medicine) => (
															<SelectItem key={medicine.id} value={medicine.id + ''}>
																{medicine.name}
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
								name="dosage_amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-lg">Dosage amount</FormLabel>
										<FormControl>
											<Input
												type="number"
												onChange={field.onChange}
												defaultValue={field.value}
												className="w-16"
											/>
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
	)
}

export default MedicineForm;
