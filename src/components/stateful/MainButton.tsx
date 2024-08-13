import { Button } from "@nextui-org/react"
import { SubmitButtonProps } from "./models/SubmitButton"
import { FC } from "react"

export const MainButton: FC<SubmitButtonProps> = ({
	children,
	type,
	disabled,
	className,
	variant,
	isLoading,
	startContent,
	endContent,
	onClick,
}) => {
	return (
		<Button
			radius="sm"
			type={type}
			disabled={disabled}
			className={`${className} bg-Pink1 font-Principal text-white hover:bg-Pink2`}
			variant={variant}
			isLoading={isLoading}
			startContent={startContent}
			endContent={endContent}
			onClick={onClick}
		>
			{children}
		</Button>
	)
}
