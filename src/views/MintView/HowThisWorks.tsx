import { FC } from 'react';
import clsx from 'clsx';

interface HowThisWorksProps {
	className?: string;
}

const HowThisWorks: FC<HowThisWorksProps> = ({ className }) => {
	return (
		<section
			className={clsx(className, 'w-full bg-green-600')}
			id="create-instance"
		>
			<div className="max-w-7xl mx-auto py-16 px-8 text-black">
				<h1 className="text-5xl md:text-5xl font-md">Wen Mint? - Mint Now!</h1>
				<p className="mt-4 text-xl text-black ">
					Get some Stoner Moon Birds for your metaversal journey! CAW CAW!
				</p>
			</div>
		</section>
	);
};

export default HowThisWorks;
