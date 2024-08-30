import { PrivateRoutes } from "../models/routes"
import { Navigate } from "react-router-dom"
import useAuthStore from "@/context/Auth.context"
import { FC, ReactNode } from "react"

interface PremiumGuardProps {
	children: ReactNode
}

const PremiumGuard: FC<PremiumGuardProps> = ({ children }) => {
	const isAuth = useAuthStore((state) => state.isAuthenticated)
	const isPremium = useAuthStore((state) => state.isPremium)

	if (!isPremium || !isAuth) {
		return <Navigate to={`/${PrivateRoutes.GAMEMENU}`} replace />
	}

	return <> {children}</>
}

export default PremiumGuard
