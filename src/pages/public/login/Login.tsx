import { useState } from "react"
import { PublicRoutes } from "@/models/routes"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"
import { useAuthUser } from "@/hooks/useAuthUser"
import { FormValues } from "@/models/FormValues"
import { MdEmail } from "react-icons/md"
import HelloBee from "@assets/beeLogin.webp"
import useAuthStore from "@/context/Auth.context"
import {
	MainButton,
	NavBar,
	TextInput,
	PasswordEye,
	StaticPagesLayout,
	Typography,
} from "@/components"

const Login = () => {
	const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const { mutation } = useAuthUser()

	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<FormValues>()

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		setIsAuthenticated(true)
		mutation.mutate(data)
		reset()
	}

	return (
		<StaticPagesLayout className="h-screen">
			<NavBar />
			<section className="p-6 mx-4 mt-4 rounded-md shadow-2xl lg:mx-12 bg-white/90 lg:mt-10">
				<Typography
					textType="MegaTitle"
					className="pb-3 text-center lg:text-4xl lg:mb-4 lg:pt-6 lg:pb-4"
				>
					Welcome to the Beehive
				</Typography>
				<div className="lg:flex">
					<article className="lg:w-1/3 lg:pl-12">
						<div className="flex justify-center">
							<img
								src={HelloBee}
								alt="happy bee"
								className="w-32 pb-6 lg:w-40"
							/>
						</div>
					</article>
					<article className="lg:flex lg:flex-col lg:w-2/3 lg:mx-[10%] lg:justify-center lg:pb-6">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-4">
								<TextInput
									autoFocus
									required
									pattern={/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i}
									invalidPatternMessage="Invalid email"
									minLength={5}
									label="email"
									autoComplete="email"
									register={register}
									formLabel="email"
									endContent={
										<MdEmail className="mb-1 mr-3 text-2xl text-gray-500" />
									}
									errors={errors}
								/>
								<TextInput
									label="password"
									autoComplete="password"
									register={register}
									formLabel="password"
									type={isPasswordVisible ? "text" : "password"}
									required={true}
									endContent={
										<PasswordEye
											isVisible={isPasswordVisible}
											toggleVisibility={() =>
												setIsPasswordVisible((prev) => !prev)
											}
										/>
									}
									errors={errors}
								/>
							</div>
							<MainButton
								className="w-full px-2 py-6 mt-4 text-lg"
								isLoading={mutation.isPending}
								type="submit"
							>
								Log In
							</MainButton>
						</form>
						<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-700 after:mt-0.5 after:flex-1 after:border-t after:border-gray-700">
							<p className="mx-4 mb-0 text-center font-Secundaria"> OR </p>
						</div>

						<div className="pb-1" />

						<div className="py-2 text-center Footer-Login font-Secundaria md:text-xl">
							Don't you have an account yet? <br />
						</div>

						<Link to={`/${PublicRoutes.SIGNUP}`}>
							<p className="pb-2 font-semibold text-center text-indigo-700 font-Secundaria md:text-xl">
								Get an Account
							</p>
						</Link>
					</article>
				</div>
			</section>
		</StaticPagesLayout>
	)
}

export default Login
