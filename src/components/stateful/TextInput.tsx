import { Input } from "@nextui-org/react"
import { TextInputModel } from "./models/TextInput.model"
import { FC } from "react"

const TextInput: FC<TextInputModel> = ({
	autoFocus,
	className,
	label,
	required,
	type,
	description,
	endContent,
	register,
	formLabel,
	autoComplete,
	pattern,
	invalidPatternMessage,
	maxLength,
	minLength,
	validate,
	errors,
}) => {
	const isInvalid = !!errors[formLabel]
	const errorMessage = errors[formLabel]?.message?.toString() || "Invalid input"

	return (
		<>
			<Input
				autoFocus={autoFocus}
				isRequired={required}
				autoComplete={autoComplete}
				type={type}
				labelPlacement="inside"
				label={label}
				variant="flat"
				radius="sm"
				className={`font-Principal rounded-md ${className}`}
				description={description}
				endContent={endContent}
				isInvalid={isInvalid}
				errorMessage={isInvalid && errorMessage}
				{...register(formLabel, {
					required: required ? "This field is required" : false,
					pattern: pattern
						? {
								value: pattern,
								message: invalidPatternMessage || `Invalid ${label}`,
							}
						: undefined,
					maxLength: maxLength
						? { value: maxLength, message: `Max length is ${maxLength}` }
						: undefined,
					minLength: minLength
						? { value: minLength, message: `Min length is ${minLength}` }
						: undefined,
					validate,
				})}
				classNames={{
					input: "font-Secundaria",
					label: "font-Principal",
					inputWrapper:
						"bg-white border border-gray-500 active:border-blue-500 focus:ring-2 focus:ring-blue-500",
				}}
			/>
		</>
	)
}
export default TextInput
