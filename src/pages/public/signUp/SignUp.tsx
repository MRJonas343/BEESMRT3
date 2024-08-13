import NavBar from "@/components/stateful/NavBar"
import Typography from "@/components/stateless/Typography"
import StaticPagesLayout from "@/components/stateless/layouts/StaticPagesLayout"
import TextInput from "@/components/stateful/TextInput"
import { useForm, SubmitHandler } from "react-hook-form"
import { FormValues } from "@/models/FormValues"
import MainButton from "@/components/stateful/MainButton"
import { useCreateUser } from "@/hooks/useCreateUser"
import PasswordEye from "@/components/stateful/PasswordEye"
import { MdEmail } from "react-icons/md"
import { useState } from "react"

const SignUp = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const { mutation } = useCreateUser()
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
		watch,
	} = useForm<FormValues>()

	const password = watch("password")

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		mutation.mutate(data)
		reset()
	}

	return (
		<StaticPagesLayout className="h-screen">
			<NavBar />
			<Typography textType="MegaTitle" className="pt-3 pb-3 text-center">
				Join the Beehive
			</Typography>
			<section className="p-6 mx-4 mt-4 rounded-md shadow-2xl bg-white/90">
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextInput
						autoFocus
						formLabel="nickName"
						register={register}
						errors={errors}
						label="NickName"
						minLength={5}
						maxLength={15}
						required
					/>
					<TextInput
						formLabel="englishLevel"
						register={register}
						errors={errors}
						label="English Level"
						minLength={2}
						maxLength={2}
						pattern={/(A1|A2|B1|B2|C1|C2|a1|a2|b1|b2|c1|c2)/}
						invalidPatternMessage="Invalid English Level Available levels: (A1, A2, B1, B2, C1, C2)"
						required
					/>
					<TextInput
						formLabel="email"
						register={register}
						errors={errors}
						label="Email"
						pattern={/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i}
						invalidPatternMessage="Invalid email"
						minLength={8}
						maxLength={50}
						endContent={
							<MdEmail className="mb-1 mr-3 text-2xl text-gray-500" />
						}
					/>
					<TextInput
						formLabel="password"
						register={register}
						errors={errors}
						minLength={8}
						required
						maxLength={25}
						label="Password"
						description="Password must be at least 8 characters long"
						pattern={/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/}
						invalidPatternMessage="Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
						endContent={
							<PasswordEye
								isVisible={isPasswordVisible}
								toggleVisibility={() => {
									setIsPasswordVisible(!isPasswordVisible)
								}}
							/>
						}
						type={isPasswordVisible ? "text" : "password"}
					/>
					<TextInput
						formLabel="confirmPassword"
						register={register}
						errors={errors}
						label="Confirm Password"
						type="password"
						validate={(value) => value === password || "Passwords do not match"}
					/>
					<MainButton type="submit">Join Us</MainButton>
				</form>
			</section>
		</StaticPagesLayout>
	)
}
export default SignUp
