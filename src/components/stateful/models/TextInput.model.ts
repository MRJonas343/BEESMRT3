import { Path, UseFormRegister, FieldErrors, Validate } from "react-hook-form"
import { FormValues } from "@/models/FormValues"
import { JSX } from "react"

type enumType = "text" | "password" | "email" | "number"

export interface TextInputModel {
	autoFocus?: boolean
	className?: string
	label: string
	required?: boolean
	autoComplete?: string
	type?: enumType
	description?: string
	endContent?: JSX.Element | JSX.Element[] | string
	formLabel: Path<FormValues>
	pattern?: RegExp
	minLength?: number
	maxLength?: number
	invalidPatternMessage?: string
	validate?: Validate<string | File, FormValues>
	register: UseFormRegister<FormValues>
	errors: FieldErrors<FormValues>
}
