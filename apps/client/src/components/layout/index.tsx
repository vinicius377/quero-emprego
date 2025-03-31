import { Suspense, type ReactNode } from 'react';
import { Header } from './Header';
import { FooterNav } from './FooterNav';
import { Footer } from './Footer';
import { useAtomValue } from 'jotai';
import { userService } from '@/services/user.service';
import { Loading } from './Loading';

export function Layout({ children }: { children: ReactNode }) {
	const user = useAtomValue(userService.user);

	return (
		<div className="flex flex-col min-h-screen">
			<div className="fixed top-0 z-10 w-full">
				<Header />
			</div>
			<main className="pt-14 flex-1 min-h-full mt-2 mb-2 px-2 bg-[#fafafa]">
				<Suspense fallback={<Loading />}>
					<div className="max-w-[70rem] m-auto">{children}</div>
				</Suspense>
			</main>
			<div className={`mb-[${user ? '3.5rem' : '0'}] md:mb-0`}>
				<Footer />
			</div>
			<div className="fixed bottom-0 z-10 w-full">
				<FooterNav />
			</div>
		</div>
	);
}
