import { FC, useEffect, useState } from 'react';
import ConnectWallet from '../../components/ConnectWallet';
import MintTokenForm from './MintTokenForm';
import TestProjJSON from '../../abis/TestProj.json';
import { Contract, ethers } from 'ethers';

const MintToken: FC = () => {
	const MAX_FREE = 10;
	const CONTRACT_ADDRESS = "0x8331A69ffE5E225d70eBd70D375FF27E6Dc4d3D9"
	const [proxyContract, setProxyContract] = useState<Contract | null>(null);
	const [availableFreeMints, setAvailableFreeMints] = useState(0);

	const handleMintNft = async (isPaid: boolean, mints: string) => {
		console.log(mints);
		try {
			// if (!false) throw new Error('Please connect your wallet');
			var mintPrice = 0;
			if (isPaid) {
				mintPrice = 0.03;
			}
			const transactionOptions = {
				gasLimit: 300000 ,
				value: ethers.utils.parseEther((mintPrice * parseInt(mints)).toString()) // adding this should fix
			}
			proxyContract?.mint(mints, transactionOptions)
		} catch (error) {
			console.error(error);
		}
	};

	// Replace with useERC721 Proxy Contract
	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const proxyContract = new ethers.Contract(
			CONTRACT_ADDRESS,
			TestProjJSON.abi,
			signer
		);

		window.ethereum.on("accountsChanged", (accounts) => {
			console.log("Account changed");
			if (proxyContract) {
				setProxyContract(proxyContract);
				let totalSupply = proxyContract.totalSupply();
				totalSupply.then(supply => {
					setAvailableFreeMints(Math.max(0,MAX_FREE - supply))
				})
			}
		})
	}, []);

	return (
		<section className="w-full bg-white" id="mint">
			{
				proxyContract ? (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<h1 className="text-7xl font-bold">Mint an NFT</h1>
						<MintTokenForm onSubmit={handleMintNft} freeAvailable={availableFreeMints.toString()} />
					</div>
				) : (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<p className="text-3xl font-bold">
							Connect wallet to continue.
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
