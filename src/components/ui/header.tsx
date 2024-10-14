'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
	const { user } = useUser(); // ใช้ useUser แทน auth()
	const router = useRouter();

	return (
		<div className="bg-gray-600 text-neutral-100">
			<div className="container mx-auto flex items-center px-4 justify-between py-4 bg-[#99DDCC]">
				<ArrowLeft onClick={() => router.back()} />
				{user ? (
					<div className="flex gap-4 items-center">
						{/* <Link href='/dashboard'>Dashboard</Link> */}
						<UserButton afterSignOutUrl="/" />
					</div>
				) : (
					<div className="flex gap-4 items-center">
						<Link href="/sign-up">Sign up</Link>
						<Link href="/sign-in">Sign In</Link>
					</div>
				)}
			</div>
		</div>
	);
}
