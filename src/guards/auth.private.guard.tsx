import useAuthStore from "@/context/Auth.context"
import { Navigate } from "react-router-dom"
import { PublicRoutes } from "../models/routes"
import { FC, ReactNode } from "react"

interface AuthGuardProps {
	children: ReactNode
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (!isAuthenticated) {
		return <Navigate replace to={`/${PublicRoutes.LOGIN}`} />
	}

	return <>{children}</>
}

export default AuthGuard
