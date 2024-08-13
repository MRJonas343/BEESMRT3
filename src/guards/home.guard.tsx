import useAuthStore from "@/context/Auth.context"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { SemiPrivateRoutes } from "../models/routes"

const HomeGuard = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (isAuthenticated) {
		return <Navigate replace to={SemiPrivateRoutes.SEMIPRIVATE} />
	}

	return <Outlet />
}

export default HomeGuard
