import NavBar from "@components/NavBar"
import { useEffect, useState } from "react"
import BasicModal from "@components/BasicModal"
import shyBee from "@assets/abeja-shy.webp"
import { useNavigate } from "react-router-dom"
import { usePersonStore } from "@store/auth"
interface UserBee {
	nickName: string
	profileImg: string
	englishLevel: string
	TotalTrophies: number
}

function Scoreboard() {
	const [showModal, setShowModal] = useState(false)
	const [imageSrc, setImageSrc] = useState("")
	const [message, setMessage] = useState("")
	const [mainMessage, setMainMessage] = useState("")
	const [usuariosBee, setUsuariosBee] = useState<UserBee[]>([])

	const token = usePersonStore((state) => state.token)

	const navigate = useNavigate()

	const closeModal = () => {
		setShowModal(!showModal)
		navigate("/login")
	}

	const fetchUsers = async () => {
		const BACKEND_URL = import.meta.env.VITE_BEESMRT_BACKEND_URL
		const response = await fetch(`${BACKEND_URL}/getLeaderBoard`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		if (response.status === 401) {
			setMessage("You are not authorized to see this content")
			setMainMessage("Unauthorized")
			setImageSrc(shyBee)
			setShowModal(true)
			return
		}

		if (response.status === 498) {
			setMessage("Your session has expired")
			setMainMessage("Session Expired")
			setImageSrc(shyBee)
			setShowModal(true)
			return
		}

		if (response.status === 404) {
			console.log("Leaderboard not found")
			return
		}

		const data: UserBee[] = await response.json()
		setUsuariosBee(data)
	}

	useEffect(() => {
		fetchUsers()
	}, [])

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

				<BasicModal
					showModal={showModal}
					imageSrc={imageSrc}
					message={message}
					mainMessage={mainMessage}
					closeModal={closeModal}
				/>
			</div>
		</div>
	)
}

export default Scoreboard
