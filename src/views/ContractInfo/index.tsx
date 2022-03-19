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
				<p className="text-3xl font-bold">for developers</p>
				<h1 className="text-7xl font-bold">contract info</h1>
				{/* <div className="mt-4 text-lg">
					<b>Wallet:</b> {address || 'Not connected'}
				</div>
				{proxyAddress && (
					<div className="mt-4">
						<div className="text-lg font-bold">Proxy Contract Details</div>
						<ol>
							<li>
								<b>Address:</b> {proxyAddress}
							</li>
							<li>
								<b>isReady:</b> {proxyIsSuccess}
							</li>
						</ol>
					</div>
				)} */}
				{/* {nftContract && (
					<div className="mt-4">
						<div className="text-lg font-bold">NFT Contract Details</div>
						<ol>
							<li>
								<b>Address:</b> {nftContract.address}
							</li>
							<li>
								<b>isReady:</b> {nftContractIsReady.toString()}
							</li>
						</ol>
					</div>
				)} */}
			</div>
		</section>
	);
};
