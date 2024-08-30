import useAuthStore from "@/store/Auth.store"
import { Navigate, Outlet } from "react-router-dom"
import { PrivateRoutes } from "../models/routes"
import { FC } from "react"

const HomeGuard: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (isAuthenticated) {
		return <Navigate to={`/${PrivateRoutes.GAMEMENU}`} replace />
	}

	return <Outlet />
}

export default HomeGuard
