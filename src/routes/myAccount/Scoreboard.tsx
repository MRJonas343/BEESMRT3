import NavBar from "@components/NavBar"

function Scoreboard() {
	return (
		<div className="bg-rose-600 w-screen h-screen overflow-x-hidden">
			<NavBar />

			<div className="flex flex-col justify-center items-center gap-5">
				<h1 className="bg-white font-Principal text-4xl font-semibold shadow-rose-950 shadow-lg py-4 px-10 rounded-md mt-7">
					Scoreboard
				</h1>
				<div className="flex flex-wrap lg:flex-row flex-col justify-center items-center gap-3">
					<div className="bg-white rounded-sm shadow-md shadow-red-950 flex flex-col justify-center font-Secundaria text-lg w-[275px] border-black py-4 px-6">
						<h1 className="text-2xl font-Principal text-center">My Ranking</h1>
						<div className="flex flex-wrap gap-3 items-center">
							<img width={70} src="/defaultProfile.svg" alt="pfpImage" />{" "}
							<h1 className="text-xl">UserBee</h1>
						</div>
						<div className="pt-3 flex gap-8">
							<div className="font-semibold">
								Ranking: <br /> Trophies: <br /> Medalls: <br /> Victories:
							</div>
							<div className="text-right">
								RankingData <br /> TrophiesData <br /> MedallsData <br />{" "}
								VictoriesData
							</div>
						</div>
					</div>
					<div className="flex md:flex-row flex-col shadow-md shadow-red-950">
						<div className="bg-white py-4 flex justify-center font-Secundaria text-lg w-[73vw] md:w-[36vw] border-black">
							Global Ranking
						</div>
						<div className="bg-white py-4 flex justify-center font-Secundaria text-lg w-[73vw] md:w-[36vw] border-black">
							Local Ranking
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Scoreboard
