import NavBar from "@components/NavBar"
import usuariosBee from "./usuariosBee.json"

function Scoreboard() {
	return (
		<div className="bg-rose-600 w-screen h-screen overflow-x-hidden">
			<NavBar />

			<div className="flex flex-col justify-center items-center gap-5">
				<h1 className="bg-white font-Principal text-4xl font-semibold shadow-rose-950 shadow-lg py-4 px-10 rounded-md mt-7">
					TOP best MONTH USERS
				</h1>
				<div className="flex flex-wrap justify-center gap-5">
					{usuariosBee.map((user, index) => (
						<div
							key={index}
							className="bg-white shadow-md shadow-red-950 flex flex-col justify-center font-Secundaria text-lg w-[230px] border-black py-6 rounded-2xl"
						>
							<h1 className="text-2xl font-Principal text-center">
								{user.nickName}
							</h1>
							<div className="flex flex-wrap gap-3 items-center justify-center">
								<img
									className="rounded-full shadow-slate-500 shadow-md"
									width={90}
									src={user.profileImg || "/defaultProfile.svg"}
									alt="pfpImage"
								/>
							</div>
							<div className="pt-3 flex justify-around">
								<div className="font-semibold">
									English Level: <br /> Trophies:
								</div>
								<div className="text-right">
									{user.englishLevel || "N/A"} <br /> {user.TotalTrophies}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Scoreboard
