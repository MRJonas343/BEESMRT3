import NavBar from "@components/NavBar"

function MyAccNew() {
	return (
		<div className="bg-gray-950 h-screen">
			<div className="bg-Gradient1 py-1 pb-3">
				<NavBar />
			</div>
			<div className="flex flex-wrap justify-center mt-16 gap-8">
				<div className="bg-white flex gap-5 p-6 rounded-lg w-11/12 sm:w-1/3">
					<img width={100} src="/defaultProfile.svg" alt="imgProfDef" />
					<div className="grid">
						<h1 className="font-semibold">BeeYam</h1>
						<h2 className="">BeeName</h2>
						<h2>Grade: Special</h2>
						<h2>Skill Level: 1</h2>
					</div>
				</div>
				<div className="bg-white grid p-8 rounded-lg w-11/12 sm:w-3/5">
					<h1 className="font-bold m-0">Advancements</h1>
					<div className="flex flex-wrap gap-4 justify-center">
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
						<img src="/medallas1.svg" alt="imgAd" />
					</div>
				</div>
				<div className="bg-white grid gap-2 p-8 rounded-lg w-full mx-4 lg:mx-7">
					<h1 className="m-0 font-Secundaria text-lg">LEVEL PROGRESS:</h1>
					<div className="bg-Gradient3 flex justify-center p-1 rounded-full text-center">
						<span className="font-semibold">LEVEL MAX. [500 LV.]</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAccNew
