import { FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface FooterProps {
	className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
	return (
		<footer className={clsx(className, 'py-8 flex justify-center items-center border-t border-t-gray-300')}>
			<a
				className='flex-grow flex justify-center items-center'
				href='https://www.web3con.dev/hackathon'
				target='_blank'
				rel='noopener noreferrer'
			>
				All rights reserved by{' Supernova '}
				<span className='ml-4'>
					<Image src='/assets/images/supernova-logo.png' alt='supernova logo' width={48} height={48} />
				</span>
			</a>
		</footer>
	);
};

Footer.displayName = 'Footer';

export default Footer;
