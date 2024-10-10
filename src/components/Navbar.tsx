'use client'
import { Calendar, House, Settings, Tablets } from 'lucide-react';
import useDetectScroll, {
	Axis,
	Direction
  } from '@smakss/react-scroll-direction';
import Link from 'next/link';


  import React from 'react'
  
  const Navbar = () => {
    const { scrollDir } = useDetectScroll();
    return (
    <nav className={`${scrollDir === "down" && 'hidden'} shadow-md border fixed flex items-center justify-between bottom-0 w-full h-16 px-12 py-2`}>
        <Link href={"/calendar"} className='text-gray-500 hover:text-black'><Calendar size={36} /></Link>
        <Link href={"/"} className='text-gray-500 hover:text-black'><House size={36} /></Link>
        <Link href={"/schedule"} className='text-gray-500 hover:text-black'><Tablets size={36} /></Link>
        <Link href={"/"} className='text-gray-500 hover:text-black'><Settings size={36} /></Link>
    </nav>
    )
  }
  
  export default Navbar
  