import { JSX, ReactNode } from "react"

export interface StaticPageLayoutProps {
	title?: string
	metaDescription?: string
	index?: "follow" | "nofollow"
	children: ReactNode | JSX.Element | JSX.Element[] | string
	className?: string
}
