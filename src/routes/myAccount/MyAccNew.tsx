import NavBar from "@components/NavBar"
import ProgressBar from "@ramonak/react-progress-bar"
import { usePersonStore } from "@store/auth"
import { useEffect, useState } from "react"
import BasicModal from "@components/BasicModal"
import { useNavigate } from "react-router-dom"
import shyBee from "@assets/abeja-shy.webp"

function MyAccNew() {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)
	const [mainMessage, setMainMessage] = useState("")
	const [message, setMessage] = useState("")
	const [imageSrc, setImageSrc] = useState("")
	const token = usePersonStore((state) => state.token)
	const userNickName = usePersonStore((state) => state.userNickName)
	const userProfileImage = String(
		usePersonStore((state) => state.userProfileImage),
	)
	const englishLevel = usePersonStore((state) => state.userEnglishLevel)

	useEffect(() => {
		if (!token) {
			setMainMessage("You are not logged in")
			setMessage("Please log in to access to your account")
			setImageSrc(shyBee)
			setShowModal(true)
		} else {
		}
	}, [])

	const closeModal = () => {
		setShowModal(false)
		navigate("/login")
	}

	const gradient =
		"linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"

	return (
		<main className="w-screen h-screen bg-violet-700 overflow-x-hidden">
			<div className="py-1 pb-3">
				<NavBar />
			</div>

			<div className="lg:flex">
				<section className="bg-white flex mx-6 rounded-md lg:w-1/3 lg:p-4">
					<div className="p-4 justify-end flex lg:justify-start">
						<img
							height={110}
							width={110}
							src={userProfileImage}
							alt="ProfileImage"
							className="w-[110px] h-[110px] rounded-full"
						/>
					</div>
					<div className="flex gap-4 flex-col justify-center">
						<p className="font-Secundaria text-xl font-semibold">
							{userNickName}
						</p>
						<h2 className="font-Secundaria text-lg">Newbie</h2>
					</div>
					<div className="flex flex-1 justify-center pl-10 items-center">
						<p className="font-Principal text-5xl text-Yellow1 text-3d">
							# 230
						</p>
					</div>
				</section>

				<section className="bg-white mx-6 mt-8 rounded-md p-6 lg:w-2/3 lg:mt-0">
					<h3 className="font-Secundaria text-xl font-semibold pb-6">
						Advancements
					</h3>
					<div className="flex justify-around flex-wrap">
						<div className="flex flex-col items-center basisAdvance pb-4">
							<img
								src="https://pub-634c4c6c8002422595e483ed8ca88991.r2.dev/ganador.png"
								alt="medal"
								className="w-16 h-16"
								width={64}
								height={64}
							/>
							<p className="font-Secundaria text-lg text-center">Winner</p>
						</div>
						<div className="flex flex-col items-center basisAdvance pb-4">
							<img
								src="https://pub-634c4c6c8002422595e483ed8ca88991.r2.dev/insignia.png"
								alt="medal"
								className="w-16 h-16"
								width={64}
								height={64}
							/>
							<p className="font-Secundaria text-lg text-center">First Game</p>
						</div>
						<div className="flex flex-col items-center basisAdvance pb-4">
							<img
								src="https://pub-634c4c6c8002422595e483ed8ca88991.r2.dev/podio.png"
								alt="medal"
								className="w-16 h-16"
								width={64}
								height={64}
							/>
							<p className="font-Secundaria text-lg text-center">Top 1</p>
						</div>
						<div className="flex flex-col items-center basisAdvance pb-4">
							<img
								src="https://pub-634c4c6c8002422595e483ed8ca88991.r2.dev/recompensa.png"
								alt="medal"
								className="w-16 h-16"
								width={64}
								height={64}
							/>
							<p className="font-Secundaria text-lg text-center">
								1000 Trophies
							</p>
						</div>
					</div>
				</section>
			</div>

			<section className="bg-white mx-6 mt-8 rounded-md p-6">
				<h3 className="font-Secundaria text-xl font-semibold pb-6">Progress</h3>
				<div className="flex flex-col">
					<ProgressBar
						completed={60}
						bgColor={gradient}
						height="30px"
						isLabelVisible={true}
						className="w-full font-Secundaria drop-shadow-md text-3d md:text-3xl"
					/>
				</div>
				<section className="flex justify-around pt-6 text-center">
					<div>
						<p className="font-Secundaria text-xl font-semibold pb-6">
							Trophies
						</p>
						<img
							src="https://pub-634c4c6c8002422595e483ed8ca88991.r2.dev/ganador.png"
							alt="Trofeo"
							className="w-16 h-16"
							width={64}
							height={64}
						/>
						<span className="font-Secundaria text-lg text-center pt-2">
							1400
						</span>
					</div>
					<div>
						<p className="font-Secundaria text-xl font-semibold pb-6">
							EnglishLevel
						</p>
						<p className="font-Principal text-5xl pt-4 text-Yellow1 text-3d">
							{englishLevel}
						</p>
						<span className="font-Secundaria text-lg text-center">
							Intermediate
						</span>
					</div>
					<div className="flex flex-col items-center">
						<p className="font-Secundaria text-xl font-semibold pb-6">
							Global Position
						</p>
						<img
							src="https://pub-634c4c6c8002422595e483ed8ca88991.r2.dev/podio.png"
							alt="Trofeo"
							className="w-16 h-16"
							width={64}
							height={64}
						/>
						<span className="font-Secundaria text-lg pt-2">#230</span>
					</div>
				</section>
			</section>

			<section className="bg-white mx-6 mt-8 rounded-md p-6 mb-8">
				<div className="flex justify-around">
					<button
						className="bg-[#9E00FF] rounded-lg w-[110px] font-Principal text-white"
						type="button"
					>
						See LeaderBoard
					</button>
					<button
						className="bg-[#30A127] py-4 rounded-lg w-[110px] font-Principal text-white"
						type="button"
					>
						Edit Profile
					</button>
					<button
						className="bg-[#E93030] rounded-lg w-[110px] font-Principal text-white"
						type="button"
					>
						Log out
					</button>
				</div>
			</section>

			<BasicModal
				showModal={showModal}
				closeModal={closeModal}
				mainMessage={mainMessage}
				message={message}
				imageSrc={imageSrc}
			/>
		</main>
	)
}

export default MyAccNew
