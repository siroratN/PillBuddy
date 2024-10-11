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
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { format } from "date-fns"

const CreateScheduleForm = () => {
	const scheduleSchema = z.object({
		patient_id: z.coerce.number().int(),
		caregivers_id: z.coerce.number().int(),
		time: z.string().time(),
		date: z.date(),
		dosage_amount: z.coerce.number().gt(0),
		status: z.enum(['taken', 'not_taken', 'postponed']),
		side_effects: z.string().nullable(),
	});

	const form = useForm<z.infer<typeof scheduleSchema>>({
		resolver: zodResolver(scheduleSchema),
	});

	return (
		<div className='max-w-lg'>
			<Form {...form}>
				<form action="">
					<FormField
						control={form.control}
						name="time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-[240px] pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) => date < new Date()}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
                    <FormField
                        control={form.control}
                        name='dosage_amount'
                        render={({field})=>(
                            <FormItem>
								<FormLabel>Dosage amount</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name='status'
                        render={({field})=>(
                            <FormItem>
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
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
