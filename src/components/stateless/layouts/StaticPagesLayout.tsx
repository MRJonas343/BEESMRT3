import { StaticPageLayoutProps } from "./models/StaticPageLayoutProps"
import { FC } from "react"

export const StaticPagesLayout: FC<StaticPageLayoutProps> = ({
	children,
	className,
}) => {
	return (
		<>
			<main className={`${className} overflow-x-hidden w-full bg-Gradient2`}>
				{children}
			</main>
		</>
	)
}
