import useAuthStore from "@/store/Auth.store"
import { PublicRoutes } from "@/models"
import logOutService from "@/services/public/logOut.user.service"

export const logOutFunction = async () => {
	const cleanStore = useAuthStore.getState().cleanStore
	await logOutService()
	cleanStore()
	window.location.href = `/${PublicRoutes.LOGIN}`
}
