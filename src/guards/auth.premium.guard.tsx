import { PrivateRoutes, PublicRoutes } from "../models/routes"
import { Outlet, Navigate } from "react-router-dom"
import useAuthStore from "@/context/Auth.context"

const PremiumGuard = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const isPremium = useAuthStore((state) => state.isPremium)

	if (!isAuthenticated) {
		return <Navigate replace to={PublicRoutes.LOGIN} />
	}

	if (!isPremium) {
		return <Navigate replace to={PrivateRoutes.PRIVATE} />
	}

	return <Outlet />
}

export default PremiumGuard
