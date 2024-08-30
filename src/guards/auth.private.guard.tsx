import useAuthStore from "@/context/Auth.context"
import { Navigate, Outlet } from "react-router-dom"
import { PublicRoutes } from "../models/routes"
import { FC } from "react"

const AuthGuard: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (!isAuthenticated) {
		return <Navigate replace to={`/${PublicRoutes.LOGIN}`} />
	}

	return <Outlet />
}

export default AuthGuard
