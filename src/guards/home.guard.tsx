import useAuthStore from "@/context/Auth.context"
import { Navigate } from "react-router-dom"
import { PrivateRoutes } from "../models/routes"
import { FC, ReactNode } from "react"

interface HomeGuardProps {
	children: ReactNode
}

const HomeGuard: FC<HomeGuardProps> = ({ children }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (isAuthenticated) {
		return <Navigate to={`/${PrivateRoutes.GAMEMENU}`} replace />
	}

	return <>{children}</>
}

export default HomeGuard
