import { PrivateRoutes } from "../models/routes"
import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "@/context/Auth.context"
import { FC } from "react"

const PremiumGuard: FC = () => {
	const isAuth = useAuthStore((state) => state.isAuthenticated)
	const isPremium = useAuthStore((state) => state.isPremium)

	if (!isPremium || !isAuth) {
		return <Navigate to={`/${PrivateRoutes.GAMEMENU}`} replace />
	}

	return <Outlet />
}

export default PremiumGuard
