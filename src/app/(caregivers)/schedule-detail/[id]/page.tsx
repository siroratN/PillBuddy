import React from 'react';
import axios from 'axios';

const page = async ({ params }: { params: { id: string } }) => {
	const res = await axios.get(`${process.env.URL}/api/notifications/${params.id}`);

	return <div>{params.id}</div>;
};

export default page;
