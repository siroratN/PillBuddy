'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Form, FormField, FormControl, FormLabel, FormItem, FormDescription, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const CreateScheduleForm = () => {

    const scheduleSchema = z.object({
        patient_id: z.coerce.number().int(),
        caregivers_id: z.coerce.number().int(),
        time:  z.string().time(),
        date: z.date(),
        dosage_amount: z.coerce.number().gt(0),
        status: z.enum(['taken', 'not_taken', 'postponed']),
        side_effects: z.string().nullable()
    })

    const form = useForm<z.infer<typeof scheduleSchema>>({
        resolver: zodResolver(scheduleSchema)
    })
  
	return <div>
        <Form {...form}>
            <form action="">
            <FormField
                control={form.control}
                name="time"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            Time
                        </FormLabel>
                        <FormControl>
                        <Input {...field} />
                        </FormControl>
                        <FormDescription>
                            This the time when you want us to send your notification.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                
            />
            <Button type='submit'>submit</Button>
            </form>
        </Form>
        </div>
}