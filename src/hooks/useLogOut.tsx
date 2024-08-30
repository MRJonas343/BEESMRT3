import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/store/Auth.store"
import logOutService from "@/services/public/logOut.user.service"
import { PublicRoutes } from "@/models"

export const useLogOut = () => {
	const cleanStore = useAuthStore((state) => state.cleanStore)

	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: () => logOutService(),
		onSuccess: () => {
			cleanStore()
			navigate(`/${PublicRoutes.LOGIN}`)
		},
		retry: 2,
	})

	return {
		mutation,
	}
}
