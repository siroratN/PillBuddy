'use client';
import React from 'react';
import { NotificationSchema } from '../../../drizzle/schema';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const AddButton = ({name, to}: {name:string, to:string}) => {
  const router = useRouter()
  return (
    <Button onClick={()=>router.push(`${to}`)}>Add {name}</Button>
  )
}

export default AddButton
