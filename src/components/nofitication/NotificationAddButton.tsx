'use client';
import React from 'react';
import { NotificationSchema } from '../../../drizzle/schema';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const NotificationAddButton = () => {
  const router = useRouter()
  return (
    <Button onClick={()=>router.push('/notification/create')}>Add Nofitication</Button>
  )
}

export default NotificationAddButton
