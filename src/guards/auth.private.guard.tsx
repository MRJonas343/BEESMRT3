import useAuthStore from "@/store/Auth.store"
import { PublicRoutes } from "@/models"
import { Navigate, Outlet } from "react-router-dom"
import { FC } from "react"

const AuthGuard: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (!isAuthenticated) {
		return <Navigate replace to={`/${PublicRoutes.LOGIN}`} />
	}

	return <Outlet />
}

export default AuthGuard
