import useAuthStore from "@/store/Auth.store"
import { PrivateRoutes } from "@/models"
import { FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

const HomeGuard: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (isAuthenticated) {
		return <Navigate to={`/${PrivateRoutes.GAMEMENU}`} replace />
	}

	return <Outlet />
}

export default HomeGuard
