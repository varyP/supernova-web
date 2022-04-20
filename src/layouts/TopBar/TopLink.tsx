import Link from 'next/link';
import Image from 'next/image';

interface TopLinkProps {
	href: string;
	text: string;
	formatting: string;
}

interface TopLinkImageProps {
	href: string;
	image: string;
}

const TopLink = ({ href, text, formatting }: TopLinkProps) => (
	<Link href={href}>
		<a>
			<button type="button" className= {formatting ? formatting : "font-bold text-black-700 hover:text-gray-500"}>
				{text}
			</button>
		</a>
	</Link>
);

const TopLinkImage = ({ href, image }: TopLinkImageProps) => (
	<a href={href}  target="_blank" rel="noopener noreferrer">
		<Image  className="font-bold text-gray-700 hover:text-gray-500"
		src={`/assets/images/${image}.png`}
		  alt={image}
		  width="32"
		  height="32"
		/>
  </a>
);

export default { TopLink, TopLinkImage };