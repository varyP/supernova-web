import TopLinks from './../../layouts/TopBar/TopLink';

export const Intro = () => {
	return (
		<section className="w-full bg-green-600 h-[42rem]" id="cff">
			<div className="max-w-7xl mx-auto w-full mt-24 py-2 px-8">
				<h1 className="text-4xl md:text-5xl lg:text-3xl xl:text-2xl sm:text-[6rem] text-black font-bold">Stoner Moon</h1>
			</div>
			<div className="max-w-7xl mx-auto w-full pb-16 px-8 py-16 space-y-8">
				<ol className="space-y-2 text-lg">
					<li>
						<span className="mr-2 text-white" role="img" aria-label="owl">
						🦉
						</span>{' '}
						<span className="text-blue font-medium">
						<span className="text-yellow-400 font-extrabold"> 4200 </span> Stoner Moon Birds to celebrate 4 / 20
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="eyes">
							👀
						</span>{' '}
						<span className="text-blue font-medium">
							reveal right after mint out
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="moon">
						🌗
						</span>{' '}
						<span className="text-blue font-medium">
						remember to puff puff pass!
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="eyes">
							🤘
						</span>{' '}
						<span className="text-blue font-medium">
							mint more, pay less -- super low gas per mint! Thanks to ERC-721A.
						</span>
					</li>
					<li></li>
					<div className="max-w-7xl mx-auto py-8 text-black">
						<p className="text-3xl font-semibold">
							Happy minting mofo!
						</p>
						<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-yellow-500 to-green-500 hover:from-red-500 hover:to-yellow-400 text-white font-bold" 
				label={"Aight light me a J"} onClick={mintNow}/>
					</div>
				</ol>
			</div>
		</section>
	);
};


interface CustomButton {
	label: string;
	onClick: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  };
  
  const CustomButton: React.FunctionComponent<CustomButton> = ({formatting = null, label, onClick, enabled = false}) => {
	
	return (
		<div className="counter-btn" onClick={enabled ? onClick: ()=>{}}>
		<TopLinks.TopLink formatting = {formatting} href="/mint" text={label} />
		</div>
	)
  }

  const mintNow = (event: FormEvent<HTMLFormElement>) => {
	event.preventDefault();
	try {
		
	} catch (error) {
		if (error) {
			console.log(error)
		}
		
	}
};