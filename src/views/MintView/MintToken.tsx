import { keccak256 } from 'ethers/lib/utils';
import MerkleTree from 'merkletreejs';
import { useWallet, useWriteContract } from '@web3-ui/hooks';
import { FC, useEffect, useState } from 'react';
import ConnectWallet from '../../components/ConnectWallet';
import MintTokenForm from './MintTokenForm';
import CFF from '../../abis/TestProj.json';
import { Contract, ethers } from 'ethers';
import web3 from 'web3';

interface CustomButton {
	formatting: string;
	label: string;
	enabled: Boolean;
	onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  };
  
  const CustomButton: React.FunctionComponent<CustomButton> = ({formatting = null, label, onClick, enabled = false}) => {
	
	return (
		<div className="counter-btn" onClick={enabled ? onClick: ()=>{}}>
		<div className = {formatting ? formatting : "child mt-6 py-2 px-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold"}>{label}</div>
	  </div>
	)
  }


const MintToken: FC = () => {
	const WL_MINT_PRICE = 0;
	const PUBLIC_MINT_PRICE = 0.011;
	
	const CHAIN_ID = 4;
	const CONTRACT_ADDRESS = "0x8260fc522fE60B0F05475b42Ce77bD1baa2797e2"
	
	const [nftContract, setNFTContract] = useState<Contract | null>(null);
	const [availableFreeMints, setAvailableFreeMints] = useState(0);
	const [isWeb3Enabled, setWeb3Enabled] = useState(false);
	const [connectedAddress, setConnectedAddress] = useState("");

	const { connected, connection, connectWallet, correctNetwork, switchToCorrectNetwork } = useWallet();

	const addresses = ["0xd08a5101546C76E8fad748fB3E25B221E9aE50e1","0xFcCFC8b6A62804F1a76715993E2fAdF4Ac0ef22C","0x1071258E2C706fFc9A32a5369d4094d11D4392Ec","0x25f7fF7917555132eDD3294626D105eA1C797250","0xF6574D878f99D94896Da75B6762fc935F34C1300","0xfDbAb374ee0FC0EA0D7e7A60917ac01365010bFe","0xfB73f8B1DcD5d61D4dDC3872dA53200B8562F243","0x95F6E4C94857f605b9A73c9163D5c94AAf849c40","0xEd2C82417256DF74a995213713A586E07d3e5255","0xCb14d0D43BB32705fAbbD863f860A1410fa14613","0x7a865e44988a2ebcad845E977db07C71f8c62d31","0x340F5bEcB63a33B53959026d0CEb1f83C53A102F","0x969560dBBf4872049D0d245791eD74dEd0D66578","0x81B8888dfbdcc3Ad1dfe30A6f58a6d47eaf99aE8","0x29aB6E246c4aC305974A730B10459417FF65D469","0x2B790Dd5d9440f098E057E4958e3Ac0214712352","0xA53E16be846D815dfF774A384858021952b5B22E","0x04473648f6BeA9b074DFd7693b20AFCF9971a125","0xc26716b827c0d207AA3D25667028C2da1De787bf","0x21BAa9441e2DF389Ca27c9dB1cD9B59f2504dfEa","0x93D5193694a49eB85366ea1BDa69B577f1b878ae","0x3654322cFecCD60965A8b7866f50e55FE14EEBCC","0x174BAFfcB004ACfc53cDD3A48957b9D353BB171f","0x1d9A510DfCa2b1f3C52BD81122816FD86C7C7Ba0","0x55ae457519BbAf25d825772da81F57bD18E4B6Db","0x0997680928431EA22C1930c12Dc91f06d10be0c6","0xF9E8383bd1250aCf18Da971467B70045d4D06fB1","0x847aB63F94e931F9264407C54C97DbCfFEC9f8FE","0x5dcE9Fc14eED67D046A130d1d991163114b2820c","0x53b5585AA42b79B0b8e620896ceB0D0435441071","0x5E661e550Fcac43DEC925449A7F0bCA0C32D6A44","0xA46f327d91282aFD4E99d79a8fD7Eac7A123dAF5","0xD03241a89a18c779B71f1bD348d2BbF1e20b8ea8","0xed0850a960ABE5715ECEa4b479272092733922f0","0x4D15f921A25e8677Da2d878B01c80Df861E67F03","0x98d450BfbBFD64D780B632f6acd0FC59d11E575e","0xaef0FfA370108915d4198Fe6eF40eBa446f00d79","0x5Bc46cf525E6E26f8799685E5247a93355354cBf","0x5B9837c339F7b55564Aeb185e8DEdeEDD10AfcB7","0xbda8049200F7a42312AFeBDb5b99D514EE0df302","0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"];
	const leaves = addresses.map(x => keccak256(x));
	const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
	const buf2hex = x => '0x' + x.toString('hex');
	console.log("Root: ",buf2hex(tree.getRoot()));
	
	const handleConnect = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (!connected) {
				connectWallet();
			} else {
				updateOnConnected(true);
			}
		} catch (error) {
			if (error) {
				console.log(error)
			}
			
		}
	};

	const getProof = (address: string): string[] => {
		if (address.length == 0) {
			console.log("empty address / proof");
			return [];
		}
		const leaf = keccak256(address) // address from wallet using walletconnect/metamask
		const proof = tree.getProof(leaf).map(x => buf2hex(x.data))
		console.log("leaf | proof : ", leaf, buf2hex(leaf), leaves[0] ,proof);

		const utils = ethers.utils
		const inString = (proof.map(function(x){
			console.log(web3.utils.hexToAscii(x));
			return web3.utils.hexToAscii(x);
		}));
		
		return inString;
	}
	const handleMintNft = async (isPaid: boolean, mints: string, merkleProof: string[]) => {
		try {
			var mintPrice = WL_MINT_PRICE;
			if (isPaid) {
				mintPrice = PUBLIC_MINT_PRICE;
				const transactionOptions = {
					gasLimit: Math.min(150000,150000 * parseInt(mints)),
					value: ethers.utils.parseEther((mintPrice * parseInt(mints)).toString())
				}
				executeContractMethod([mints], "mint", transactionOptions);
			} else {
				const transactionOptions = {
					gasLimit: 150000 ,
					value: ethers.utils.parseEther(mintPrice.toString())
				}
				const utils = web3.utils
				let merkleInBytes = (merkleProof.map(x => utils.asciiToHex(x)));
				executeContractMethod(merkleInBytes, "whitelistMint", transactionOptions);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const executeContractMethod = async(params: any[], methodName: string, transactionOptions:object) => {
		try {
			let chainId = await ethereum.request({ method: 'net_version' });
			if (chainId !== `${CHAIN_ID}`) {
			alert(`Please change your network to "ETH MAINNET" in your wallet`);
			return;
			}
			console.log("Calling ", methodName, "with Params", params, transactionOptions);
			switch(methodName) { 
				case "whitelistMint": { 
					console.log("Executing ", methodName);
					let gasEstimate = await nftContract[methodName](params);
					const tx = await nftContract[methodName](params, transactionOptions);
				}  
				default: { 
					console.log("Executing ", methodName);
					const tx = await nftContract[methodName](...params, transactionOptions);
				} 
			 }
		} catch(error){
			  console.log(error);
			try{
			  if(!(error.data.message.indexOf('BigNumber') > -1)){
				alert(error.data.message)
			  }
			}catch{
			  try{
				if(!(error.message.split('"message"')[1].split('"')[1].indexOf('BigNumber') > -1)){
				  alert(error.message.split('"message"')[1].split('"')[1])
				}
			  }
			  catch{
				if(!(error.message.indexOf('BigNumber') > -1)){
				  alert(error.message)
				}
			  }
			}
		  }
	}

	const handleWindowLoad = () => {
		console.log("handleWindowLoad");
		if (typeof window.ethereum !== 'undefined') {
			console.log('web3 is enabled')
			setWeb3Enabled(true);
			// setContract(true);
			connect();
			window.ethereum.on("accountsChanged", handleAccountsChanged);
			window.ethereum.on('disconnect', handleDisconnected);
		} else {
			console.log('web3 is not found')
			setWeb3Enabled(false);
		}
	}
	const handleAccountsChanged = (accounts: Array<string>) => {
		console.log("accountsChanged", accounts.length, connected);
		if (accounts.length != 0 || connected) {
			setConnectedAddress(accounts.length >= 1 ? accounts[0] : "");
			updateOnConnected(true);
		} else {
			console.log("No Contract")
			setNFTContract(null);
		}
	}

	const handleOnConnect = (accounts: Array<string>) => {
		console.log("handleOnConnect", accounts.length, connected);
		if (accounts.length != 0 || connected) {
			setConnectedAddress(accounts.length >= 1 ? accounts[0] : "");
			let provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const proxyContract = new ethers.Contract(
				CONTRACT_ADDRESS,
				CFF.abi,
				signer
			);
			setNFTContract(proxyContract);
		} else {
			console.log("No Contract")
			setNFTContract(null);
		}
	}

	function connect() {
		console.log("Request connection");
		window.ethereum
		  .request({ method: 'eth_requestAccounts' })
		  .then(handleOnConnect)
		  .catch((error) => {
			if (error.code === 4001) {
			  // EIP-1193 userRejectedRequest error
			  console.log('Please connect to MetaMask.');
			} else {
			  console.error(error);
			}
		  });
	  }

	const setContract = (enabled: Boolean) => {
		if (enabled) {
			console.log("setting contract");
			let provider;
			window.ethereum.request({ method: 'eth_requestAccounts' }).then(provider = new ethers.providers.Web3Provider(window.ethereum))
			.catch( error =>  console.log(error) );
			const signer = provider.getSigner();
			const proxyContract = new ethers.Contract(
				CONTRACT_ADDRESS,
				CFF.abi,
				signer
			);
			setNFTContract(proxyContract);
		} else {
			console.log("unable to set contract - web3 not enabled");
			setNFTContract(null);
		}
	}

	const updateOnConnected = (isConnected: Boolean) => {
		console.log("updateOnConnected")
		if (isConnected) {
			console.log("updateOnConnected: settingContract: ", isWeb3Enabled);
			setContract(true);
		} else {
			console.log("updateOnConnected: notConnected: ", isWeb3Enabled, nftContract);
			if (nftContract) {
				setNFTContract(null);
			} else {
				connectWallet();
			}
		}
	}

	const handleDisconnected = (error) => {
		console.log("handleDisconnected");
		setNFTContract(null);
	}

	// useEffect(() => {
	// 	console.log('correctNetwork', correctNetwork);
	//   }, [correctNetwork]);

	// Replace with useERC721 NFT Contract
	useEffect(() => {
		handleWindowLoad();
		return () => {
			if (typeof window.ethereum !== 'undefined') {
				console.log("removing listeners");
				window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
				window.ethereum.removeListener('disconnect', handleDisconnected);
			} else {
				console.log("web3 not enabled - unable to remove Listeners")
			}
		}
	}, []);

	return (
		// <section>
		// 	{console.log("connectedAddress -- -", connectedAddress)}
		// </section>,
		<section className="w-full bg-white" id="mint">
			{
				nftContract && connected ? (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<h1 className="text-3xl font-extralight">Mint a Fren</h1>
						<MintTokenForm onSubmit={handleMintNft} freeAvailable={availableFreeMints.toString()} merkleProof={getProof(connectedAddress)} />
					</div>
				) : (
					<div className="max-w-7xl mx-auto py-16 px-8 text-black">
						<p className="text-3xl font-bold">
							Connect wallet to continue.
						</p>
						<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
				label={"Connect Wallet"} onClick={handleConnect} enabled= {true}/>
					</div>
				)
			}
		</section>
	);
};

export default MintToken;
