'use client';
import React from 'react';
import { NotificationSchema } from '../../../drizzle/schema';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const NotificationAction = () => {
  const router = useRouter()
  return (
    <div className='flex justify-between w-full'>
      <Button onClick={()=>{

      }}>Create New</Button>
    </div>
  )
}

export default NotificationAction
