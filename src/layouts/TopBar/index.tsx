import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Disclosure } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/solid';

import TopLinks from './TopLink';
import { Wallet } from '../../components/Wallet';

interface TopBarProps {
	className?: string;
}

const TopBar: FC<TopBarProps> = ({ className }) => {
	// const { address } = useEthereum();

	return (
		<div className={clsx(className, 'sticky top-0 w-full flex flex-col bg-green-600')}>
			<Disclosure>
				<div className="px-8 flex-1 flex justify-between items-center">
					<div className="py-4 text-4xl text-black font-extrabold">
						<Link href="/">Stoner Moon 🦉</Link>
					</div>
					{/* Desktop Header Items + Connect Wallet button */}
					<div className="hidden md:flex items-center gap-8 xl:gap-16 text-xl">
						<TopLinks.TopLink href="/mint" text="Mint ☘️" />
						{/* <TopLinks.TopLink href="/#faq" text="FAQ" /> */}
					</div>
					<div className="hidden md:flex items-center gap-8 xl:gap-16 text-xl">
						<TopLinks.TopLinkImage href="https://twitter.com/StonerBirdNFT" image="twitter_button" />
						<TopLinks.TopLinkImage href="https://opensea.io/collection/stonermoonbird" image="opensea" />
					</div>
					<div className="hidden md:flex">
						{/* <Wallet ens={address} userAddress={address} /> */}
					</div>
					{/* Mobile Header */}
					<div className="md:hidden">
						<Disclosure.Button className="-mr-4 p-2">
							<MenuIcon className="w-5 h-5 text-gray-900" />
						</Disclosure.Button>
					</div>
				</div>
				<Disclosure.Panel className="px-8 pb-4 text-gray-500">
					<div className="flex flex-col items-center gap-4">
						<Link href="/">
							<a>
								<Disclosure.Button className="font-bold text-gray-700 hover:text-gray-500">
									Home
								</Disclosure.Button>
							</a>
						</Link>
						<Link href="/mint">
							<a>
								<Disclosure.Button className="font-bold text-gray-700 hover:text-gray-500">
									Mint
								</Disclosure.Button>
							</a>
						</Link>
						{/* <Link href="/#faq">
							<a>
								<Disclosure.Button className="font-bold text-gray-700 hover:text-gray-500">
									FAQ
								</Disclosure.Button>
							</a>
						</Link> */}
						<div>
							{/* { <Wallet ens={address} userAddress={address} /> } */}
						</div>
					</div>
				</Disclosure.Panel>
			</Disclosure>
			<div className="h-2 bg-gradient-to-r from-yellow-200 via-green-400 to-green-700" />
		</div>
	);
};

TopBar.displayName = 'TopBar';

export default TopBar;
