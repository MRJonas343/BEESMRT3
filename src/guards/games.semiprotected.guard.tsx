import useAuthStore from "@/context/Auth.context"
import ModalShouldLogin from "@/utils/ModalShouldLogin"
import { Outlet } from "react-router-dom"

/**
 * GamesGuard component is a guard that checks if the user is authenticated before rendering the protected routes related to games.
 * If the user is not authenticated, it displays an error modal and provides options to login or continue later.
 * @returns The GamesGuard component.
 */
const GamesGuard = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	if (!isAuthenticated) {
		return (
			<>
				<ModalShouldLogin />
				<Outlet />
			</>
		)
	}

	return <Outlet />
}

export default GamesGuard
