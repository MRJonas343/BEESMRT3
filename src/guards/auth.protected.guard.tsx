import useAuthStore from "@/context/Auth.context"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { PublicRoutes } from "../models/routes"

const AuthGuard = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (!isAuthenticated) {
		return <Navigate replace to={PublicRoutes.LOGIN} />
	}

	return <Outlet />
}

export default AuthGuard
