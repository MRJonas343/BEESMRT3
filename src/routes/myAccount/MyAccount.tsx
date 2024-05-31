import { useState, useEffect } from "react"

//* Components
import NavBar from "@components/NavBar"

//* Assets
import Skill from "@assets/skills.svg"
import Friends from "@assets/friends.svg"
import Medalla from "@assets/medalla.svg"

const MyAccount = () => {
	//* States
	const [userData, setUserData] = useState({
		nickname: "BeeStudent",
		fullName: "",
		avatar_url: "/defaultProfile.svg",
	})

	//*Check wich token is available
	useEffect(() => {
		if (localStorage.getItem("accessToken")) {
			getGithubUser()
		} else if (localStorage.getItem("TokenFacebook")) {
			getUserFacebook()
		} else if (localStorage.getItem("TokenBeesmrt")) {
			getBeeUser()
		}
	}, [])

	//* Get the user data from Github
	async function getGithubUser() {
		const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
		await fetch(`${BeeSMRTBackendURL}/getUserGithub`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				const newData = {
					nickname: data.login,
					fullName: data.name,
					avatar_url: data.avatar_url,
				}
				setUserData(newData)
			})
	}

	//* Get the user data from Facebook
	async function getUserFacebook() {
		try {
			const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			const token = localStorage.getItem("TokenFacebook")

			const response = await fetch(`${BeeSMRTBackendURL}/getUserFacebook`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				const data = await response.json()
				const newUserData = {
					nickname: data.nickName,
					fullName: data.fullName,
					avatar_url: data.profileImg,
				}
				setUserData(newUserData)
			} else {
				console.error(
					"Error en la respuesta del servidor:",
					response.statusText,
				)
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}

	//* Get the user data from Beesmrt
	async function getBeeUser() {
		try {
			const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			const token = localStorage.getItem("TokenBeesmrt")

			const response = await fetch(`${BeeSMRTBackendURL}/getBeeUser`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				const data = await response.json()
				const newUserData = {
					nickname: data.nickName,
					fullName: data.fullName,
					avatar_url: data.profileImg,
				}
				setUserData(newUserData)
			} else {
				console.error(
					"Error en la respuesta del servidor:",
					response.statusText,
				)
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}

	//* Log out
	function logOut() {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("TokenFacebook")
		localStorage.removeItem("TokenBeesmrt")
		window.location.assign("https://beesmrt2.vercel.app")
	}

	return (
		<main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
			<NavBar />
			<section>
				<div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
					<div
						className="rounded-t-lg h-32 overflow-hidden bg-slate-800"
						id="backgroundUser"
					>
						{/* BackgroundUserCard */}
					</div>
					<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
						<img
							alt="avatar_url"
							className="object-cover object-center h-32"
							src={userData.avatar_url}
						/>
					</div>
					<div className="text-center mt-2">
						<h2 className="font-semibold">{userData.nickname}</h2>
						<p className="text-gray-500">{userData.fullName}</p>
					</div>
					<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
						<li className="flex flex-col items-center justify-around">
							<img src={Skill} alt="" className="w-8" />
							<div className="text-center">
								Skill level <br /> 4,300
							</div>
						</li>
						<li className="flex flex-col items-center justify-between">
							<img src={Friends} alt="" className="w-8" />
							<div className="text-center">
								Friends <br /> 106
							</div>
						</li>
						<li className="flex flex-col items-center justify-around">
							<img src={Medalla} alt="" className="w-8" />
							<div className="text-center">
								Victories <br /> 554
							</div>
						</li>
					</ul>
					<div className="p-4 border-t mx-8 mt-2">
						<button
							type="button"
							onClick={logOut}
							className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
						>
							Log out
						</button>
					</div>
				</div>
			</section>
		</main>
	)
}

export default MyAccount
