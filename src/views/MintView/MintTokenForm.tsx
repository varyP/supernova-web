import { FC, FormEvent, useState } from 'react';

interface MintTokenFormProps {
	onSubmit: (mints: string) => void;
}

const MintTokenForm: FC<MintTokenFormProps> = ({ onSubmit }) => {
	const [mintNum, setMints] = useState('1');
	const [error, setError] = useState<Error | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			if (!mintNum) return;
			let _mintNum = Number(mintNum);
			if (typeof _mintNum !== 'number') throw new Error('Mint Amount is not a valid number.');
			onSubmit(mintNum);
		} catch (error) {
			setError(error);
		}
	};
	console.log('error', error);

	return (
		<div className="md:w-3/6 mt-4 gap-4">
			<div>
				<p className="mt-4 text-xl">
					Select upto a max of 10 per transaction.
				</p>
			</div>
			<form className="" onSubmit={handleSubmit}>
				<div className="flex gap-4 mt-4">
					<div className="flex flex-col">
						<label htmlFor="mints"># of Mints</label>
						<input
							value={mintNum}
							onChange={(e) => setMints(e.target.value)}
							id="mints"
							type="text"
							className="mt-1 py-2 px-3 form-control border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-black"
							placeholder="1"
						/>
					</div>
				</div>

				<div className="flex gap-4">
					<button
						type="submit"
						className="float-left mt-6 py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold"
					>
						Mint
					</button>
				</div>
			</form>
		</div>
	);
};

export default MintTokenForm;
