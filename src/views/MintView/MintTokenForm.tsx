import React, { FC, FormEvent, useState, MouseEvent } from 'react';
import { CustomButton, CounterDisplay } from './Buttons';

interface MintTokenFormProps {
	onSubmit: (isPaid: boolean, mints: string, merkleProof: bytes32[]) => void;
	freeAvailable: string;
	merkleProof: bytes32[];
}

interface CustomButton {
	label: string;
	onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  };
  
  const CustomButton: React.FunctionComponent<CustomButton> = ({formatting = null, label, onClick, enabled = true}) => {
	
	return (
		<section>
			{console.log("enabled -- -", enabled)}
		</section>,
	  <div className="counter-btn" onClick={enabled ? onClick: ()=>{}}>
		<div className = {formatting ? formatting : "child mt-6 py-2 px-8 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold"}>{label}</div>
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
	const [mintNum, setMints] = useState('0');
	const [freeMints, setFreeMints] = useState('0');
	const [error, setError] = useState<Error | null>(null);

	const handleFree = (event: FormEvent<HTMLFormElement>) => {
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (!mintNum) return;
			let _mintNum = Number(mintNum);
			if (typeof _mintNum !== 'number') throw new Error('Mint Amount is not a valid number.');
			onSubmit(true, mintNum);
		} catch (error) {
			setError(error);
		}
	};

	const [count, setCount] = React.useState<number>(1);
	
	const inc = (event) => {
		if (count < 10) {
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
			<form className="" onSubmit={handleSubmit}>
				<div className="flex gap-4 mt-4">
					<div className="flex flex-col gap-4">
						<label htmlFor="mints">Free Mints Remaining: {freeAvailable}</label>
						<div className="flex ... gap-20 text-xl">
						<div className="flex-1 ..."><CustomButton label={"-"} onClick={dec}/></div>
						<div className="contents">
							<div className="flex-1 ... "><CounterDisplay count={count} /></div>
						</div>
						<div className="flex-1 ..."><CustomButton label={"+"} onClick={inc}/></div>
						</div>
					</div>
				</div>
				
					{ merkleProof.length != 0 ?
				<div className="flex gap-4">
					<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
					label={"WL Mint"} onClick={handleFree} enabled={true}/>
					<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
					label={"Mint"} onClick={handleSubmit}/>
				</div> 
				:
				<div className="flex gap-4">
					<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-100 to-red-100 hover:from-red-100 hover:to-red-200 text-white font-bold" 
					label={"WL Mint"} onClick={handleFree} enabled={false}/>
					<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
					label={"Mint"} onClick={handleSubmit}/>
				</div> 
					}
			</form>
		</div>
	);
};

export default MintTokenForm;