'use client';
import { Calendar, CalendarCheck, House, Settings, Tablets } from 'lucide-react';
import useDetectScroll, { Axis, Direction } from '@smakss/react-scroll-direction';
import Link from 'next/link';
import { useEffect } from 'react';

import React from 'react';

const Navbar = () => {
	const { scrollDir } = useDetectScroll();
	let role = 'caregiver';

	return (
		<nav
			className={`${
				scrollDir === 'down' && 'hidden'
			} shadow-md border fixed  bottom-0 w-full h-16 px-12 py-2`}
		>
			{role === 'patient' ? (
				<div className="flex items-center justify-between">
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
				</div>
			) : (
				<div className="flex items-center justify-center gap-12">
					<Link href={'/schedule'} className="text-gray-500 hover:text-black">
						<CalendarCheck size={36} />
					</Link>
					<Link href={'/medicines'} className="text-gray-500 hover:text-black">
						<Tablets size={36} />
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
