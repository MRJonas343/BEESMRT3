import NavBar from "@components/NavBar"
import ProgressBar from "@ramonak/react-progress-bar"
import { usePersonStore } from "@store/auth"
import { useEffect, useState } from "react"
import BasicModal from "@components/BasicModal"
import { useNavigate } from "react-router-dom"
import shyBee from "@assets/abeja-shy.webp"
import { useForm } from "react-hook-form"
import { newUserData } from "@types"
import { Link } from "react-router-dom"

const MyAccNew: React.FC = () => {
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)
	const [showModalEditProfile, setShowModalEditProfile] = useState(false)
	const [mainMessage, setMainMessage] = useState("")
	const [message, setMessage] = useState("")
	const [imageSrc, setImageSrc] = useState("")
	const [totalTrophies, setTotalTrophies] = useState(0)
	const token = usePersonStore((state) => state.token)
	const userNickName = usePersonStore((state) => state.userNickName)
	const userProfileImage = String(
		usePersonStore((state) => state.userProfileImage),
	)
	const userFullName = usePersonStore((state) => state.userFullName)
	const englishLevel = usePersonStore((state) => state.userEnglishLevel)
	const userEmail = usePersonStore((state) => state.userEmail)
	const setUserNickName = usePersonStore((state) => state.setNickName)
	const setUserProfileImage = usePersonStore((state) => state.setProfileImage)
	const setUserEnglishLevel = usePersonStore(
		(state) => state.setUserEnglishLevel,
	)
	const setToken = usePersonStore((state) => state.setToken)
	const setUserEmail = usePersonStore((state) => state.setEmail)
	const setUserFullName = usePersonStore((state) => state.setFullName)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<newUserData>()

	useEffect(() => {
		if (!token) {
			setMainMessage("You are not logged in")
			setMessage("Please log in to access to your account")
			setImageSrc(shyBee)
			setShowModal(true)
		} else {
			fetchUserData()
		}
	}, [])

	const closeModal = () => {
		setShowModal(false)
		navigate("/login")
	}

	const fetchUserData = async () => {
		if (!userEmail) return
		const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
		const response = await fetch(`${BeeSMRTBackendURL}/getUserInfoDashboard`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				email: userEmail,
			},
		})
		const data = await response.json()
		setTotalTrophies(data[0].TotalTrophies)
	}

	const logOut = () => {
		setUserNickName(null)
		setUserProfileImage(null)
		setUserEnglishLevel(null)
		setToken(null)
		setUserEmail(null)
		setUserFullName(null)
		navigate("/")
	}

	const changeProfileData = (form: newUserData) => {
		const formToSend = new FormData()

		if (form.fullName && form.fullName !== userFullName) {
			formToSend.append("fullName", form.fullName)
		}

		if (form.nickName && form.nickName !== userNickName) {
			formToSend.append("nickName", form.nickName)
		}

		if (form.englishLevel && form.englishLevel !== englishLevel) {
			formToSend.append("englishLevel", form.englishLevel)
		}

		if (form.profileImage[0] && form.profileImage[0].size > 5242880) {
			setMainMessage("The image is too big")
			setMessage("The image should be less than 5MB")
			setImageSrc(shyBee)
			setShowModal(true)
			return
		}

		if (form.profileImage.length > 0 && form.profileImage.length < 2) {
			formToSend.append("image", form.profileImage[0])
		}

		if (formToSend.entries().next().done) {
			setMainMessage("No changes detected")
			setMessage("Please make a change to save")
			setImageSrc(shyBee)
			setShowModal(true)
			return
		}

		updateData(formToSend)

		setShowModalEditProfile(!showModalEditProfile)
	}

	const updateData = async (form: FormData) => {
		const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL

		const response = await fetch(`${BeeSMRTBackendURL}/updateUserInfo`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				email: userEmail!,
			},
			body: form,
		})
		const responseData = await response.json()
		//*check the response
		if (response.status !== 200) {
			setMainMessage("Error")
			setMessage("There was an error updating your data")
			setImageSrc(shyBee)
			setShowModal(true)
			return
		}

		//*update the states
		if (responseData.fullName) {
			setUserFullName(responseData.fullName)
		}
		if (responseData.nickName) {
			setUserNickName(responseData.nickName)
		}
		if (responseData.englishLevel) {
			setUserEnglishLevel(responseData.englishLevel)
		}
		if (responseData.profileImg) {
			setUserProfileImage(responseData.profileImg)
		}
		reset()
	}

	const closeModalEditProfile = () => {
		setShowModalEditProfile(!showModalEditProfile)
	}

	const gradient =
		"linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"

	return (
		<main className="w-screen h-screen bg-violet-700 overflow-x-hidden">
			<div className="py-1 pb-3 ">
				<NavBar />
			</div>

			<section className="max-w-[1300px] flex flex-col mx-auto">
				<div className="lg:flex">
					<section className="bg-white/90 shadow-lg flex mx-6 rounded-md lg:w-2/5 lg:p-4">
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

					<section className="bg-white/90 shadow-lg mx-6 mt-8 rounded-md p-6 lg:w-3/5 lg:mt-0">
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
								<p className="font-Secundaria text-lg text-center">
									First Game
								</p>
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

				<section className="bg-white/90 shadow-lg mx-6 mt-8 rounded-md p-6">
					<h3 className="font-Secundaria text-xl font-semibold pb-6">
						Progress
					</h3>
					<div className="flex flex-col">
						<ProgressBar
							completed={totalTrophies}
							customLabel={String(totalTrophies)}
							bgColor={gradient}
							height="40px"
							isLabelVisible={true}
							className="w-full font-Secundaria drop-shadow-md text-3d md:text-3xl"
							maxCompleted={8840}
							animateOnRender={true}
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
								{totalTrophies}
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

				<section className="bg-white/90 shadow-lg mx-6 mt-8 rounded-md p-6 mb-8">
					<div className="flex justify-around">
						{/* <Link to="/Scoreboard"> */}
						<button
							className="bg-[#9E00FF] rounded-lg w-[110px] font-Principal text-white"
							type="button"
						>
							See LeaderBoard
						</button>
						{/* </Link> */}
						<button
							className="bg-[#30A127] py-4 rounded-lg w-[110px] font-Principal text-white"
							type="button"
							onClick={() => setShowModalEditProfile(!showModalEditProfile)}
						>
							Edit Profile
						</button>
						<button
							className="bg-[#E93030] rounded-lg w-[110px] font-Principal text-white"
							type="button"
							onClick={logOut}
						>
							Log out
						</button>
					</div>
				</section>
			</section>

			<section>
				<div
					className={
						showModalEditProfile
							? "fixed top-0 left-0 w-screen h-screen bg-gray-400/90 flex justify-center items-center"
							: "hidden"
					}
				>
					<div className="bg-white w-[90%] rounded-xl p-7 h-auto absolute z-30 top-1/2 left-1/2 fixPosition lg:w-1/3">
						<h1 className="font-Principal text-2xl text-center text-Yellow1 text-3d">
							Customize your profile
						</h1>
						<form onSubmit={handleSubmit(changeProfileData)}>
							<div className="font-Principal text:lg md:text-xl leading-7 py-2 text-gray-900">
								Full name: <br />
								<input
									defaultValue={userFullName ? userFullName : ""}
									autoComplete="username"
									type="text"
									className="w-full mb-4 font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
									{...register("fullName", {
										minLength: 5,
										maxLength: 50,
										pattern: /^[A-Za-z\sÁÉÍÓÚáéíóúñÑü\-']+$/,
									})}
								/>
								{errors.fullName?.type === "minLength" && (
									<p className="text-red-600 font-Secundaria pb-2">
										Your name should have 5 letters at least
									</p>
								)}
								{errors.fullName?.type === "maxLength" && (
									<p className="text-red-600 font-Secundaria pb-2">
										Your name can't be longer that 50 letters
									</p>
								)}
								{errors.fullName?.type === "pattern" && (
									<p className="text-red-600 font-Secundaria pb-2">
										Your name should just have letters
									</p>
								)}
								NickName: <br />
								<input
									defaultValue={userNickName ? userNickName : ""}
									autoComplete="username"
									type="text"
									className="w-full mb-4 font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
									{...register("nickName", {
										minLength: 5,
										maxLength: 50,
									})}
								/>
								{errors.nickName?.type === "minLength" && (
									<p className="text-red-600 font-Secundaria">
										Your nickname should have 5 letters at least
									</p>
								)}
								{errors.nickName?.type === "maxLength" && (
									<p className="text-red-600 font-Secundaria">
										Your nickname can't be longer that 50 letters
									</p>
								)}
								English Level: <br />
								<input
									defaultValue={englishLevel ? englishLevel : ""}
									autoComplete="englishLevel"
									type="text"
									className="w-full mb-4 font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
									{...register("englishLevel", {
										minLength: 2,
										maxLength: 2,
										pattern: /(A1|A2|B1|B2|C1|C2)/,
									})}
								/>
								{errors.englishLevel?.type === "minLength" && (
									<p className="text-red-600 font-Secundaria mb-2">
										Your English level should have 2 letters
									</p>
								)}
								{errors.englishLevel?.type === "maxLength" && (
									<p className="text-red-600 font-Secundaria mb-2">
										Your English level should have 2 letters
									</p>
								)}
								{errors.englishLevel?.type === "pattern" && (
									<p className="text-red-600 font-Secundaria mb-2">
										Your English level should be A1, A2, B1, B2, C1 or C2
									</p>
								)}
								<label className="block mb-2 font-medium" htmlFor="file_input">
									Upload file
								</label>
								<input
									className="block p-2 w-full border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
									aria-describedby="file_input_help"
									id="file_input"
									type="file"
									{...register("profileImage")}
								/>
								<p
									className="mt-2 mb-4 text-sm text-gray-500"
									id="file_input_help"
								>
									SVG, PNG, JPG or GIF (MAX. 800x400px).
								</p>
							</div>
							<div className="flex justify-between">
								<button
									className="bg-[#E93030] rounded-lg w-[110px] font-Principal text-white"
									type="button"
									onClick={closeModalEditProfile}
								>
									Close
								</button>
								<button
									className="bg-[#30A127] py-4 rounded-lg w-[110px] font-Principal text-white"
									type="submit"
								>
									Save
								</button>
							</div>
						</form>
					</div>
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
