import { FC, useEffect, useState } from 'react';
import ConnectWallet from '../../components/ConnectWallet';
import MintTokenForm from './MintTokenForm';
import TestProjJSON from '../../abis/TestProj.json';
import { Contract, ethers } from 'ethers';

const MintToken: FC = () => {
	// const { address } = useEthereum();
	const [proxyContract, setProxyContract] = useState<Contract | null>(null);

	const handleMintNft = async (mints: string) => {
		console.log(mints);
		try {
			// if (!false) throw new Error('Please connect your wallet');
			proxyContract?.mint(mints)//{
				// value: 1//,ethers.utils.parseEther("0.033"),
				// gasLimit: '3000000',
			// });
		} catch (error) {
			console.error(error);
		}
	};

	// Replace with useERC721 Proxy Contract
	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const proxyContract = new ethers.Contract(
			'0xffF682c06C269dfBA84D08d174102005d4D726a5',
			TestProjJSON.abi,
			signer
		);
		setProxyContract(proxyContract);
	}, []);

	return (
		<section className="w-full bg-white" id="mint">
			{
				proxyContract ? (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<h1 className="text-7xl font-bold">Mint an NFT</h1>
						<MintTokenForm onSubmit={handleMintNft} />
					</div>
				) : (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<p className="text-3xl font-bold">
							The DAO has not yet initialized their NFT contract.
						</p>
						<p className="mt-4 text-3xl font-bold">
							Please wait for this to be completed.
						</p>
					</div>
				)
			}
		</section>
	);
};

export default MintToken;
