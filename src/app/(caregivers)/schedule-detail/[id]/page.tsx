'use client';
import React from 'react';
import { useParams } from 'next/navigation';

const page = () => {
	const params = useParams<{ id: string }>();
	return <div>{123}</div>;
};

export default page;
