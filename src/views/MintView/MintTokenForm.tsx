import React, { FC, FormEvent, useState, MouseEvent } from 'react';

interface MintTokenFormProps {
	onSubmit: (isPaid: boolean, mints: string, merkleProof: string[]) => void;
	freeAvailable: string;
	merkleProof: string[];
}

interface CustomButton {
	label: string;
	onTap: (event?: React.MouseEvent<HTMLDivElement>) => void;
	formatting: string;
	enabled: Boolean;
  };
  //float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-yellow-500 to-green-500 hover:from-red-500 hover:to-yellow-400 text-white font-bold
  const defaultButtonFormatting = "child mt-6 py-2 px-8 rounded-lg bg-gradient-to-r from-yellow-500 to-green-500 hover:from-red-500 hover:to-yellow-400 text-white font-bold";
  const CustomButton: React.FunctionComponent<CustomButton> = ({label, onTap, formatting = null, enabled = true}) => {
	formatting = formatting || defaultButtonFormatting;
	let callback = enabled ? onTap : (event: React.MouseEvent<HTMLElement>) => {};
	return (
	  <div className="counter-btn" onClick= {callback}>
		<div className = {formatting}>{label}</div>
	  </div>
	)
  }

  interface CounterDisplayProps {
	count: number;
  };
  
  const CounterDisplay: React.FunctionComponent<CounterDisplayProps> = ({count}) => {  
	return (
	  <div className = "mt-6 py-2 px-4 rounded-lg bg-slate-200 text-black font-bold">{count}</div>
	);
  }

const MintTokenForm: FC<MintTokenFormProps> = ({ onSubmit, freeAvailable, merkleProof }) => {
	const MAX_PER_TXN = 10;
	const [mintNum, setMints] = useState('1');
	const [freeMints, setFreeMints] = useState('0');
	const [error, setError] = useState<Error | null>(null);

	const handleFree = (event: FormEvent<HTMLDivElement>) => {
		event.preventDefault();
		try {
			if (!mintNum) return;
			let _mintNum = Number(mintNum);
			if (typeof _mintNum !== 'number') throw new Error('Mint Amount is not a valid number.');
			onSubmit(false,mintNum, merkleProof);
		} catch (error) {
			setError(error);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
		event.preventDefault();
		try {
			if (!mintNum) return;
			let _mintNum = Number(mintNum);
			if (typeof _mintNum !== 'number') throw new Error('Mint Amount is not a valid number.');
			onSubmit(true, mintNum, merkleProof);
		} catch (error) {
			setError(error);
		}
	};

	const [count, setCount] = React.useState<number>(1);
	
	const inc = () => {
		if (count < MAX_PER_TXN) {
			setCount(count + 1);
			setMints((count + 1).toString());
		}
	};

	const dec = () => {
		if (count > 1) {
			setCount(count - 1);
			setMints((count - 1).toString());
		}
	}

	return (
		<div className="md:w-3/6 mt-4 gap-4">
			<div>
				<p className="mt-4 text-xl">
					Select upto a max of 10 per transaction.
				</p>
			</div>
			<form className="">
				<div className="flex gap-4 mt-4">
					<div className="flex flex-col gap-4">
						<label htmlFor="mints">First <span className="text-blue font-medium">420</span> were free 💨 and <span className="text-blue font-medium">Max 4</span> free per transaction! (Free mint over)</label>
						<label htmlFor="mints">Now minting <span className="text-blue font-medium">at 0.0069e</span> per NFT!</label>
						<div className="flex ... gap-20 text-xl">
						<div className="flex-1 ..."><CustomButton label={"-"} onTap={dec} formatting= {defaultButtonFormatting} enabled= {true}/></div>
						<div className="contents">
							<div className="flex-1 ... "><CounterDisplay count={count} /></div>
						</div>
						<div className="flex-1 ..."><CustomButton label={"+"} 
						onTap={inc} formatting={defaultButtonFormatting} enabled= {true}/></div>
						</div>
					</div>
				</div>
				
					{/* { merkleProof.length != 0 ? */}
				<div className="flex gap-4">
					{/* <CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-yellow-500 to-green-500 hover:from-red-500 hover:to-yellow-400 text-white font-bold" 
					label={"Mint ☘️"} onTap={handleSubmit} enabled= {false}/> */}
					{/* <CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
					label={"1 Free WL Mint"} onTap={handleFree} enabled={true}/> */}
				</div> 
				{/* : */}
				{/* <div className="flex gap-4">
					<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
					label={"Mint"} onTap={handleSubmit} enabled= {true}/>
					<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-100 to-red-100 hover:from-red-100 hover:to-red-200 text-white font-bold" 
					label={"1 Free WL Mint"} onTap={handleFree} enabled={false}/>
				</div>  */}
					{/* } */}
			</form>
		</div>
	);
};

export default MintTokenForm;