'use client';
import { Calendar, House, Settings, Tablets } from 'lucide-react';
import useDetectScroll, { Axis, Direction } from '@smakss/react-scroll-direction';
import Link from 'next/link';
import { useEffect } from 'react';

import React from 'react';

const Navbar = () => {
	const { scrollDir } = useDetectScroll();
	const MINUTE_MS = 600;

	useEffect(() => {
		const interval = setInterval(() => {
			console.log('123123213');
		}, MINUTE_MS);

		return () => clearInterval(interval);
	}, []);
	return (
		<nav
			className={`${
				scrollDir === 'down' && 'hidden'
			} shadow-md border fixed flex items-center justify-between bottom-0 w-full h-16 px-12 py-2`}
		>
			<Link href={'/calendar'} className="text-gray-500 hover:text-black">
				<Calendar size={36} />
			</Link>
			<Link href={'/'} className="text-gray-500 hover:text-black">
				<House size={36} />
			</Link>
			<Link href={'/schedule'} className="text-gray-500 hover:text-black">
				<Tablets size={36} />
			</Link>
			<Link href={'/'} className="text-gray-500 hover:text-black">
				<Settings size={36} />
			</Link>
		</nav>
	);
};

export default Navbar;
