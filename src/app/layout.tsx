import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Header from '@/components/ui/header';
import { auth, currentUser } from '@clerk/nextjs/server';
import { useEffect } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const user = auth()
	return (
		<html lang="en">
			<body className={cn('min-h-screen, bg-background antialiased', inter.className)}>
			<ClerkProvider>
				<Header/>
				{children}
				{/* disable for development */}
				{/* {user.userId && <Navbar/>} */}
				<Navbar/>
				</ClerkProvider>
			</body>
		</html>
	);
}
