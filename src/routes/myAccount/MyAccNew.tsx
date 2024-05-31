import NavBar from "@components/NavBar"

function MyAccNew() {
	return (
		<div className="bg-Gradient1 h-screen">
			<div className="bg-slate-900 py-1 pb-3">
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
