import authUserService from "@/services/public/auth.user.service"
import { useMutation } from "@tanstack/react-query"
import useAuthStore from "@/store/Auth.store"
import { useNavigate } from "react-router-dom"
import { FormValues, PrivateRoutes } from "@/models"

export const useAuthUser = () => {
	const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: (data: FormValues) =>
			authUserService(data.email, data.password),
		onSuccess: (data) => {
			const { email, nickName, englishLevel } = data
			setIsAuthenticated(true, email, nickName, englishLevel)
			navigate(`/${PrivateRoutes.GAMEMENU}`, { replace: true })
		},
		retry: 2,
	})

	return {
		mutation,
	}
}
