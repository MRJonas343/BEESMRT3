import NavBar from "@components/NavBar"
import ProgressBar from "@ramonak/react-progress-bar"

function MyAccNew() {
	const gradient =
		"linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"

	return (
		<div className="w-screen h-screen bg-violet-700 overflow-x-hidden">
			<div className="py-1 pb-3 bg-gradient2">
				<NavBar />
			</div>
			<div className="flex flex-wrap justify-center mt-6 gap-8">
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
				<div className="bg-white grid gap-2 p-4 rounded-lg w-full mx-4 lg:mx-7 mb-10">
					<h1 className="m-0 font-Secundaria text-lg">LEVEL PROGRESS:</h1>
					<ProgressBar
						bgColor={gradient}
						labelColor="black"
						height={"30"}
						completed={100}
					/>
					<div className="flex justify-around mt-10">
						<div className="grid justify-items-center gap-2">
							<h1 className="font-semibold font-Secundaria">Trophies</h1>
							<img
								className="w-10 md:w-14"
								src="/medallas1.svg"
								alt="imgTrophy"
							/>
							<span className="font-semibold">10,203,343 Trophies</span>
						</div>
						<div className="grid justify-items-center items-center">
							<h1 className="font-semibold font-Secundaria">Global Position</h1>
							<div className="text-3xl font-bold flex items-center gap-2">
								<img className="w-10 md:w-14" src="/beeTop.svg" alt="imgtop" />
								#1
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAccNew
