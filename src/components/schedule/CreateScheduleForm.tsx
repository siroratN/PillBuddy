'use client';
import React from 'react';
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

const CreateScheduleForm = () => {
	const scheduleSchema = z.object({
		schedule_id: z.coerce.number().int(),
		notification_time: z.string().time(),
		dosage_amount: z.coerce.number().int().gt(0),
		meal: z.enum(['morning', 'afternoon', 'evening', 'bedtime']),
	});

	const form = useForm<z.infer<typeof scheduleSchema>>({
		resolver: zodResolver(scheduleSchema),
	});

	const onSubmit = (values: z.infer<typeof scheduleSchema>) => {
		console.log(values)
	};

	return (
		<div className="max-w-lg">
			<Form {...form}>
				<form action="" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="schedule_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Patient</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue="field.value">
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a fruit" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Fruits</SelectLabel>
												<SelectItem value="1">Apple</SelectItem>
												<SelectItem value="banana">Banana</SelectItem>
												<SelectItem value="blueberry">Blueberry</SelectItem>
												<SelectItem value="grapes">Grapes</SelectItem>
												<SelectItem value="pineapple">Pineapple</SelectItem>
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
						name="notification_time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Input type="time" step={1} onChange={field.onChange} defaultValue={field.value} />
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
								<FormLabel>Dosage amount</FormLabel>
								<FormControl>
									<Input type="number" onChange={field.onChange} defaultValue={field.value}/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="meal"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Meal</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue="field.value">
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a fruit" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="morning">Morning</SelectItem>
												<SelectItem value="afternoon">Afternoon</SelectItem>
												<SelectItem value="evening">Evening</SelectItem>
												<SelectItem value="bedtime">Bedtime</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateScheduleForm;
