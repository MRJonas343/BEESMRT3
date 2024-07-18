import NavBar from "@components/NavBar"
import usuariosBee from "./usuariosBee.json"

function Scoreboard() {
	return (
		<div className="bg-rose-600 w-screen h-screen overflow-x-hidden">
			<NavBar />
			<div className="flex flex-col justify-center items-center gap-5 pb-10">
				<h1 className="bg-white font-Principal text-4xl font-semibold shadow-rose-950 shadow-lg py-4 px-10 rounded-md mt-7">
					TOP Best Month Users
				</h1>
				<div className="bg-white rounded-md shadow-lg p-5 w-4/5">
					<div className="flex justify-between pb-4 border-b-2 border-gray-200">
						<div className="text-3xl font-Principal">Top Bee Users</div>
						<div className="text-3xl font-Principal">Trophies</div>
					</div>
					<ul className="divide-y divide-gray-200">
						{usuariosBee.map((user, index) => (
							<li
								key={index}
								className={`py-4 flex items-center justify-between ${
									index === 0
										? "text-violet-900"
										: index === 1
											? "text-rose-800"
											: index === 2
												? "text-amber-700"
												: ""
								}`}
							>
								<div className="flex items-center">
									<img
										className="h-12 w-12 rounded-full shadow-slate-500 shadow-md"
										src={user.profileImg || "/defaultProfile.svg"}
										alt={`${user.nickName}'s profile`}
									/>
									<div className="ml-4">
										<h2 className="text-2xl font-Principal">{user.nickName}</h2>
										<div className="text-sm text-gray-500">
											English Level: {user.englishLevel || "N/A"}
										</div>
									</div>
								</div>
								<div className="text-lg font-semibold">
									{user.TotalTrophies}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Scoreboard
