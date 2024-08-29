import { StaticPageLayoutProps } from "./models/StaticPageLayoutProps"
import { FC } from "react"

export const StaticPagesLayout: FC<StaticPageLayoutProps> = ({
	children,
	className,
	index,
	metaDescription,
	title,
}) => {
	return (
		<>
			<title>{title}</title>
			<meta name="description" content={metaDescription} />
			<meta name="robots" content={`index, ${index}`} />
			<main className={`${className} overflow-x-hidden w-full bg-Gradient2`}>
				{children}
			</main>
		</>
	)
}
