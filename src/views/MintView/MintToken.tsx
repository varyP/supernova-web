import { useWallet, useWriteContract } from '@web3-ui/hooks';
import { FC, useEffect, useState } from 'react';
import ConnectWallet from '../../components/ConnectWallet';
import MintTokenForm from './MintTokenForm';
import TestProjJSON from '../../abis/TestProj.json';
import { Contract, ethers } from 'ethers';

interface CustomButton {
	label: string;
	onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  };
  
  const CustomButton: React.FunctionComponent<CustomButton> = ({formatting = null, label, onClick, enabled = false}) => {
	
	return (
	  <div className="counter-btn" onClick={onClick} disabled={!enabled}>
		<div className = {formatting ? formatting : "child mt-6 py-2 px-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold"}>{label}</div>
	  </div>
	)
  }


const MintToken: FC = () => {
	const MAX_FREE = 10;
	const CONTRACT_ADDRESS = "0x8331A69ffE5E225d70eBd70D375FF27E6Dc4d3D9"
	const [proxyContract, setProxyContract] = useState<Contract | null>(null);
	const [availableFreeMints, setAvailableFreeMints] = useState(0);
	const [isWeb3Enabled, setWeb3Enabled] = useState(false);

	const { connected, connection, connectWallet } = useWallet();
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (!connected) {
				connectWallet();
			} else {
				updateOnConnected();
			}
		} catch (error) {
			if (error) {
				console.log(error)
			}
			
		}
	};

	const handleMintNft = async (isPaid: boolean, mints: string) => {
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

	const handleAccountsChanged = (accounts: Array<string>) => {
		if (accounts.length != 0 && connected) {
			updateOnConnected();
		} else {
			console.log("No ProxyContract")
		}
	}

	const setContract = () => {
		if (isWeb3Enabled) {
			let provider;
		window.ethereum.request({ method: 'eth_requestAccounts' }).then(provider = new ethers.providers.Web3Provider(window.ethereum));
		// const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const proxyContract = new ethers.Contract(
			CONTRACT_ADDRESS,
			TestProjJSON.abi,
			signer
		);
		setProxyContract(proxyContract);
		} else {
			setProxyContract(null);
		}
	}

	const updateOnConnected = () => {
		if (connected) {
			setContract();
		} else {
			if (proxyContract) {
				setProxyContract()
			} else {
				connectWallet();
			}
		}
	}

	const handleDisconnected = (error) => {
		setProxyContract();
	}

	// Replace with useERC721 Proxy Contract
	useEffect(() => {

		window.addEventListener('load', function() {
			if (typeof web3 !== 'undefined') {
			  console.log('web3 is enabled')
			  setWeb3Enabled(true);
			  if (web3.currentProvider.isMetaMask === true) {
				console.log('MetaMask is active')
			  } else {
				console.log('MetaMask is not available')
			  }
			} else {
			  console.log('web3 is not found')
			  setWeb3Enabled(true);
			}
		  })

		  if (isWeb3Enabled) {
			setContract();
			window.ethereum.on("accountsChanged", handleAccountsChanged);
			window.ethereum.on('disconnect', handleDisconnected);
		  }

		return () => {
			if (isWeb3Enabled) {
				window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
				window.ethereum.removeListener('disconnect', handleDisconnected);
			}
		}
	}, []);

	return (
		<section className="w-full bg-white" id="mint">
			{
				proxyContract && connected ? (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<h1 className="text-3xl font-extralight">Mint a Fren</h1>
						<MintTokenForm onSubmit={handleMintNft} freeAvailable={availableFreeMints.toString()} />
					</div>
				) : (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<p className="text-3xl font-bold">
							Connect wallet to continue.
						</p>
						<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
				label={"Connect Wallet"} onClick={handleSubmit}/>
					</div>
				)
			}
		</section>
	);
};

export default MintToken;
