import { FC } from "react"
import { FaEyeSlash, FaEye } from "react-icons/fa"

export interface PasswordEyeProps {
	isVisible: boolean
	toggleVisibility: () => void
}

export const PasswordEye: FC<PasswordEyeProps> = ({
	isVisible,
	toggleVisibility,
}) => {
	return (
		<button
			className="focus:outline-none"
			type="button"
			onClick={toggleVisibility}
			aria-label="toggle password visibility"
		>
			{isVisible ? (
				<FaEye className="mb-1 mr-3 text-2xl text-gray-500" />
			) : (
				<FaEyeSlash className="mb-1 mr-3 text-2xl text-gray-500" />
			)}
		</button>
	)
}
