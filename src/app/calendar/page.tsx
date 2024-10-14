'use client'
import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useUser } from '@clerk/nextjs'

const Page = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const { user } = useUser();
  return (
    <div className='w-full flex justify-center'>
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border mx-auto"
    />
    <h1>{user?.fullName}</h1>
    </div>
  )
}

export default Page
