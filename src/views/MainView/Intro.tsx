import TopLinks from './../../layouts/TopBar/TopLink';

export const Intro = () => {
	return (
		<section className="w-full bg-yellow-300 h-[36rem]" id="cff">
			<div className="max-w-7xl mx-auto w-full mt-24 py-16 px-8">
				<h1 className="text-2xl sm:text-[6rem] text-black font-bold">Cool Furry Frens</h1>
			</div>
			<div className="max-w-7xl mx-auto w-full pb-16 px-8 space-y-8">
				<ol className="space-y-2 text-lg">
					<li>
						<span className="mr-2 text-white" role="img" aria-label="dna">
						🪐
						</span>{' '}
						<span className="text-blue font-semibold">
						<span className="text-blue-400 font-extrabold"> 6969 </span> cool 👽 met some 🐱 frens in the metaversal galaxy
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="water-wave">
						🎫
						</span>{' '}
						<span className="text-blue">
							hodl or trade your cool frens & be prepared for something special
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="eyes">
							🤘
						</span>{' '}
						<span className="text-blue">
							mint more, pay less! -- super low gas per mint!
						</span>
					</li>
					<li></li>
					<div className="max-w-7xl mx-auto py-8 text-black">
						<p className="text-3xl font-bold">
							Happy minting mofo!
						</p>
						<CustomButton formatting="float-left mt-6 py-3 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" 
				label={"Let me in"} onClick={mintNow}/>
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
		<TopLinks.TopLink formatting = "child mt-6 py-2 px-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-red-700 text-white font-bold" href="/mint" text="Let me in!" />
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