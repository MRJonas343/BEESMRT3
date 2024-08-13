export interface SubmitButtonProps {
	children: React.ReactNode | JSX.Element | JSX.Element[] | string
	type: "submit" | "reset" | "button"
	disabled?: boolean
	className?: string
	variant?:
		| "solid"
		| "faded"
		| "bordered"
		| "flat"
		| "light"
		| "ghost"
		| "shadow"
	isLoading?: boolean
	startContent?: JSX.Element | JSX.Element[]
	endContent?: JSX.Element | JSX.Element[]
	onClick?: () => void
}
