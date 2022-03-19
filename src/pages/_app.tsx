import type { AppProps } from 'next/app';
import { Provider, NETWORKS } from '@web3-ui/core';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider network={NETWORKS.mumbai}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
