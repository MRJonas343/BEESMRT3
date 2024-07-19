import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Lottie from "lottie-react"
import confetti from "canvas-confetti"

//* Componentes
import NavBar from "@components/NavBar"
import BasicModal from "@components/BasicModal"

//* Assets
import HappyBee from "@assets/abeja-saludando.webp"
import ShyBee from "@assets/abeja-shy.webp"
import HelloBee from "@assets/beeLogin.webp"
import TickCustome from "@assets/Tick_custom_icon.json"

//*Types
import { registerUser } from "@types"

const SignUp: React.FC = () => {
	//* Conffeti effect
	const duration = 15 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	//* Generete a random number for the confetti effect
	const randomInRange = (min: number, max: number) => {
		return Math.random() * (max - min) + min
	}

	const navigate = useNavigate()

	//*States
	const [imageSrc, setImageSrc] = useState("")
	const [message, setMessage] = useState("")
	const [mainMessage, setMainMessage] = useState("")
	const [showModal, setShowModal] = useState(false)

	//*Form (React Hook Form)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<registerUser>()

	//*Function to send the form
	async function getForm(data: registerUser) {
		try {
			const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
			const response = await fetch(`${BeeSMRTBackendURL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})

			if (response.status === 406) {
				setImageSrc(ShyBee)
				setMainMessage("Oh no!")
				setMessage("You sent wrong data, please check your information")
				setShowModal(true)
				return
			}

			if (response.status === 409) {
				setImageSrc(ShyBee)
				setMainMessage("Oh no!")
				setMessage("This email is already registered")
				setShowModal(true)
				return
			}

			if (response.status === 500) {
				setImageSrc(ShyBee)
				setMainMessage("Oh no!")
				setMessage("Something went wrong, please try again later")
				setShowModal(true)
				return
			}

			if (response.status === 201) {
				setImageSrc(HappyBee)
				setMainMessage("Welcome to the BEE TEAM!!!")
				setMessage("You have successfully registered")
				setShowModal(true)
				const interval = setInterval(() => {
					const timeLeft = animationEnd - Date.now()
					if (timeLeft <= 0) {
						clearInterval(interval)
						return
					}
					const particleCount = 50 * (timeLeft / duration)
					const origin1 = { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
					const origin2 = { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
					confetti({ ...defaults, particleCount, origin: origin1 })
					confetti({ ...defaults, particleCount, origin: origin2 })
				}, 250)
				setTimeout(() => {
					navigate("/login")
				}, 3000)
			}
		} catch (error) {
			console.error("Error:", error)
		}
		reset()
	}

	//*Function to check if the passwords match
	function chekPassword(e: React.ChangeEvent<HTMLInputElement>) {
		const password = (
			document.querySelector('input[name="password"]') as HTMLInputElement
		).value
		if (e.target.value !== password) {
			e.target.setCustomValidity("Passwords don't match")
		} else {
			e.target.setCustomValidity("")
		}
	}

	return (
		<main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
			<NavBar />
			<div className="lg:flex justify-around lg:shadow-2xl lg:bg-white lg:mx-10 rounded-lg lg:mt-4">
				<div className="hidden lg:flex flex-col lg:w-3/6 px-7 pt-7 pb-5 mt-4">
					<div className="flex items-center h-10 gap-2">
						<img src={HelloBee} className="w-10" alt="helloBee" />
						<span className="font-Principal mt-2 text-4xl text-white text-3d tracking-wide">
							BeeSMRT
						</span>
					</div>
					<ul className="pt-4">
						<li className="font-Secundaria text-lg py-3">
							<div className="flex gap-2 items-center font-bold">
								<Lottie animationData={TickCustome} className="w-10" />
								<h3 className="">Create an account to start learning</h3>
							</div>
							<span className="font-Secundaria">
								Start playing our games and practice your English with our
								games, with an account you can view your progress and enjoy
								other unique features.
							</span>
						</li>

						<li className="font-Secundaria text-lg py-3">
							<div className="flex gap-2 items-center font-bold">
								<Lottie animationData={TickCustome} className="w-10" />
								<h3 className="">Get access to all the features</h3>
							</div>
							<span className="font-Secundaria">
								Enjoy our wide range of games and modes available, even with
								progressive experience in some of them.
							</span>
						</li>

						<li className="font-Secundaria text-lg py-3">
							<div className="flex gap-2 items-center font-bold">
								<Lottie animationData={TickCustome} className="w-10" />
								<h3 className="">Join the Bee Team</h3>
							</div>
							<span className="font-Secundaria">
								Join the bee team and start playing with people from different
								parts of the world, or with your friends.{" "}
							</span>
						</li>
					</ul>
				</div>
				<div className="bg-white rounded-md px-7 pt-7 pb-5 mt-4 text-center mx-7 shadow-2xl lg:w-3/6 lg:shadow-none">
					<form onSubmit={handleSubmit(getForm)}>
						<div className="flex justify-center items-center gap-3">
							<span className="font-Principal text-3xl">
								Join the BEE TEAM!!!
							</span>
							<img src={HappyBee} className="w-10" alt="HappyBee" />
						</div>
						<div className="text-left font-Principal text:lg md:text-xl leading-7 py-2 text-gray-900">
							Full name: <br />
							<input
								placeholder="Jhon Beesmith"
								autoComplete="username"
								type="text"
								className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
								{...register("fullName", {
									required: true,
									minLength: 5,
									maxLength: 50,
									pattern: /^[A-Za-z\sÁÉÍÓÚáéíóúñÑü\-']+$/,
								})}
							/>
							{errors.fullName?.type === "required" && (
								<p className="text-red-600 font-Secundaria">
									This field is required
								</p>
							)}
							{errors.fullName?.type === "minLength" && (
								<p className="text-red-600 font-Secundaria">
									Your name should have 5 letters at least
								</p>
							)}
							{errors.fullName?.type === "maxLength" && (
								<p className="text-red-600 font-Secundaria">
									Your name can't be longer that 50 letters
								</p>
							)}
							{errors.fullName?.type === "pattern" && (
								<p className="text-red-600 font-Secundaria">
									Your name should just have letters
								</p>
							)}
						</div>

						<div className="text-left font-Principal text:lg md:text-xl pb-2 leading-7 text-gray-900">
							Nick name: <br />
							<input
								placeholder="Mr.BEE343"
								className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
								{...register("nickName", {
									required: true,
									minLength: 5,
									maxLength: 50,
								})}
							/>
							{errors.nickName?.type === "required" && (
								<p className="text-red-600 font-Secundaria">
									This field is required, you will be able to change your Nick
									name later
								</p>
							)}
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
						</div>

						<div className="text-left pb-2 font-Principal text:lg md:text-xl leading-7 text-gray-900">
							Email: <br />
							<input
								placeholder="beesmrt@example.com"
								autoComplete="email"
								type="text"
								className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
								{...register("email", {
									required: true,
									pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
								})}
							/>
							{errors.email?.type === "required" && (
								<p className="text-red-600 font-Secundaria">
									This field is required
								</p>
							)}
							{errors.email?.type === "pattern" && (
								<p className="text-red-600 font-Secundaria">
									This email is not valid
								</p>
							)}
						</div>
						<div className="text-left pb-2 font-Principal text:lg md:text-xl leading-7 text-gray-900">
							Password: <br />
							<input
								placeholder="Happ&BEE1"
								type="password"
								autoComplete="new-password"
								className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
								{...register("password", {
									required: true,
									minLength: 8,
									maxLength: 20,
									pattern:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_=+]).{8,}$/i,
								})}
							/>
							{errors.password?.type === "required" && (
								<p className="text-red-600 font-Secundaria">
									This field is required
								</p>
							)}
							{errors.password?.type === "minLength" && (
								<p className="text-red-600 font-Secundaria">
									Your password should have 8 characters at least
								</p>
							)}
							{errors.password?.type === "maxLength" && (
								<p className="text-red-600 font-Secundaria">
									Your password can't be longer that 20 characters
								</p>
							)}
							{errors.password?.type === "pattern" && (
								<p className="text-red-600 font-Secundaria">
									Your password should have at least one uppercase letter, one
									lowercase letter, one number and one special character
								</p>
							)}
						</div>
						<div className="text-left font-Principal text:lg md:text-xl leading-7 text-gray-900">
							Confirm password: <br />
							<input
								placeholder="Happ&BEE1"
								type="password"
								autoComplete="current-password"
								className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
								onChange={chekPassword}
							/>
							<br />
							<div className="py-2">
								<button
									className="font-Principal text-white bg-Pink2 py-2 w-full focus:outline-none hover:bg-Pink1 rounded text-xl shadow-lg"
									type="submit"
								>
									Sign Up
								</button>
							</div>
							<div className="text-center py-2 pt-3 font-Secundaria">
								Do you already have an account? <br />{" "}
								<Link to="/login" className="text-indigo-700 font-bold">
									Go to Log In
								</Link>
							</div>
							<div className="text-center pt-2 font-Secundaria">
								<p>
									By signing up, you agree to our
									<br />
									<Link
										to="/privacypolicy"
										className="text-indigo-700 font-semibold"
									>
										{" "}
										Privacy Policy
									</Link>
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
			<BasicModal
				imageSrc={imageSrc}
				mainMessage={mainMessage}
				message={message}
				showModal={showModal}
				closeModal={() => setShowModal(false)}
			/>
		</main>
	)
}

export default SignUp
