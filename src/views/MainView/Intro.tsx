export const Intro = () => {
	return (
		<section className="w-full bg-gradient-to-r from-indigo-900 to-indigo-400" id="supernova">
			<div className="max-w-7xl mx-auto w-full mt-24 py-16 px-8">
				<h2 className="text-3xl font-bold text-white content">Experience the phenomenon of</h2>
				<h1 className="text-7xl sm:text-[8rem] text-indigo-100 font-extrabold">SuperNova</h1>
				<h2 className="mt-8 text-3xl font-bold text-white">
					Mint your <span className="text-indigo-400">NFT</span> and own a piece of galactic art!
				</h2>
			</div>
			<div className="max-w-7xl mx-auto w-full pb-16 px-8 space-y-8">
				<p className="text-xl text-white">
				<span className="text-red-400 font-extrabold"> Supernova </span> is:
				</p>
				<ol className="space-y-2 text-lg">
					<li>
						<span className="mr-2 text-white" role="img" aria-label="dna">
						🧬
						</span>{' '}
						<span className="text-white">
							a collection of 555 generative audio visual NFTs.
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="water-wave">
							🌊
						</span>{' '}
						<span className="text-white">
							created using P5.js
						</span>
					</li>
					<li>
						<span className="mr-2" role="img" aria-label="eyes">
							👀
						</span>{' '}
						<span className="text-white">
							randomly generated for you
						</span>
					</li>
					<li></li>
				</ol>
			</div>
		</section>
	);
};
