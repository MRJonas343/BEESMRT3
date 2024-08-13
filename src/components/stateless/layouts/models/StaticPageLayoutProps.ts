import { ReactNode } from "react"

export interface StaticPageLayoutProps {
	children: ReactNode | JSX.Element | JSX.Element[] | string
	className?: string
}
