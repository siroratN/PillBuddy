'use client'
import React from 'react'
import { Calendar } from '@/components/ui/calendar'

const Page = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className='w-full flex justify-center'>
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border mx-auto"
    />
    </div>
  )
}

export default Page
