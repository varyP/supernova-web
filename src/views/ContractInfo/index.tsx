import { useWallet, useWriteContract } from '@web3-ui/hooks';
import { HOST_ADDRESS, CFA_ADDRESS } from '../../constants';
import { useEffect } from 'react';
import { ethers } from 'ethers';

export const ContractInfo = ({ nftContractItem }: any) => {
	// const { address } = useEthereum();
	// const { Proxy, TotalSupply, Balance } = useERC721();
	// const { data: proxyAddress, isSuccess: proxyIsSuccess } = Proxy();
	const { connected, connection, connectWallet } = useWallet();

	// console.log('connection', connection);

	useEffect(() => {
		if (!connected) {
			connectWallet();
		}
	}, []);

	return (
		<section className="w-full bg-white" id="start">
			<div className="max-w-7xl mx-auto py-16 px-8 text-black">
			</div>
		</section>
	);
};
