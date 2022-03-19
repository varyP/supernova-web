import { FC } from 'react';
import Head from 'next/head';

interface HeadTagsProps {
	title?: string;
	description?: string;
}

const HeadTags: FC<HeadTagsProps> = ({ title, description }) => {
	return (
		<Head>
			<title>{title ?? 'Supernova'}</title>
			<meta name='description' content={description ?? 'Presenting Supernova'} />
			<link rel='icon' href='/favicon.ico' />
		</Head>
	);
};

HeadTags.displayName = 'HeadTags';

export default HeadTags;
