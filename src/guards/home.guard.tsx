import useAuthStore from "@/context/Auth.context"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { PrivateRoutes } from "../models/routes"

const HomeGuard = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (isAuthenticated) {
		return <Navigate replace to={PrivateRoutes.PRIVATE} />
	}

	return <Outlet />
}

export default HomeGuard
