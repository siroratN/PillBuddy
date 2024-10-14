'use client';
import { Calendar, CalendarCheck, House, Settings, Tablets } from 'lucide-react';
import useDetectScroll from '@smakss/react-scroll-direction';
import Link from 'next/link';
import { RoleContext } from '@/app/AuthProvider/AuthProiver';
import { useContext } from 'react';

const Navbar = () => {
    const { scrollDir } = useDetectScroll();
    const { role } = useContext(RoleContext) || { role: null };
	console.log('Current role:', role);

    return (
        <nav
            className={`${
                scrollDir === 'down' ? 'hidden' : ''
            } shadow-md border fixed bottom-0 w-full h-16 px-12 py-2`}
        >
            {role === 'patient' ? (
                <div className="flex items-center justify-between">
                    <Link href={'/calendar'} className="text-gray-500 hover:text-black">
                        <Calendar size={36} />
                    </Link>
                    <Link href={'/home'} className="text-gray-500 hover:text-black">
                        <House size={36} />
                    </Link>
                </div>
            ) : role === 'caregiver' ? (
                <div className="flex items-center justify-center gap-12">
                    <Link href={'/schedule'} className="text-gray-500 hover:text-black">
                        <CalendarCheck size={36} />
                    </Link>
                </div>
            ) : null}
        </nav>
    );
};

export default Navbar;
