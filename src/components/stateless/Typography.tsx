import { FC } from "react"

export interface TypographyProps {
	children: string
	textType: "MegaTitle" | "title" | "subtitle" | "paragraph" | "caption"
	className?: string
}

export const Typography: FC<TypographyProps> = ({
	children,
	className,
	textType,
}) => {
	if (textType === "MegaTitle")
		return (
			<h1
				className={`${className} text-3xl font-Principal text-3d2 tracking-wide
			 text-white`}
			>
				{children}
			</h1>
		)

	if (textType === "title")
		return (
			<h1 className={`${className} text-xl font-Principal text-3d text-white`}>
				{children}
			</h1>
		)
	if (textType === "subtitle")
		return (
			<h2 className={`${className} text-lg font-Principal text-3d text-white`}>
				{children}
			</h2>
		)
	if (textType === "paragraph")
		return (
			<p className={`${className} text-base font-Secundaria`}>{children}</p>
		)
	if (textType === "caption")
		return <p className={`${className} text-sm font-Secundaria`}>{children}</p>
}
