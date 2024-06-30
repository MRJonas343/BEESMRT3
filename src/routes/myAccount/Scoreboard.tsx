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
					<div className="bg-white rounded-sm shadow-md shadow-red-950 flex flex-col justify-center font-Secundaria text-lg w-[27vw] border-black py-2">
						<h1 className="text-2xl font-Principal">My Ranking</h1>
						<div className="flex flex-wrap">
							<img src="" alt="pfpImage" /> <h1>UserBee</h1>
						</div>
					</div>
					<div className="flex shadow-md shadow-red-950">
						<div className="bg-white py-2 flex justify-center font-Secundaria text-lg w-[47vw] lg:w-[34vw] border-black">
							Global
						</div>
						<div className="bg-white py-2 flex justify-center font-Secundaria text-lg w-[47vw] lg:w-[34vw] border-black">
							Global
						</div>
					</div>
				</div>
			</div>

			<div>Hola</div>
		</div>
	)
}

export default Scoreboard
