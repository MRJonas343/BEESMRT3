import NavBar from "@components/NavBar"

function MyAccNew() {
	return (
		<div className="bg-Gradient1 h-screen">
			<div className="bg-slate-900 py-5">
				<NavBar />
			</div>
			<div className="flex flex-wrap justify-around mt-16 gap-2">
				<div className="bg-white flex gap-5 p-6 rounded-lg">
					<img src="/defaultProfile.svg" alt="imgProfDef" />
					<div className="grid">
						<h1 className="font-semibold">BeeYam</h1>
						<h2 className="">BeeName</h2>
						<h2>Grade: Special</h2>
						<h2>Skill Level: 1</h2>
					</div>
				</div>
				<div className="bg-white grid p-8 w-3/4 rounded-lg">
					<h1 className="font-bold m-0">Advancements</h1>
					<div className="flex flex-wrap gap-7">
						<img src="" alt="imgAd1" />
						<img src="" alt="imgAd2" />
						<img src="" alt="imgAd3" />
						<img src="" alt="imgAd4" />
						<img src="" alt="imgAd5" />
						<img src="" alt="imgAd6" />
						<img src="" alt="imgAd7" />
					</div>
				</div>
			</div>
			<div className="bg-white flex gap-5 p-8 m-10 rounded-lg">
				<h1>Hola</h1>
			</div>
		</div>
	)
}

export default MyAccNew
