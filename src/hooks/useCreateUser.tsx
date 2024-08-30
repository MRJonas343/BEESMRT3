import { useMutation } from "@tanstack/react-query"
import createUserService from "@/services/public/create.user.service"
import useAuthStore from "@/store/Auth.store"
import { FormValues, PrivateRoutes } from "@/models"
import { useNavigate } from "react-router-dom"

export const useCreateUser = () => {
	const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: (data: FormValues) =>
			createUserService(
				data.email,
				data.password,
				data.nickName,
				data.englishLevel.toUpperCase(),
			),
		onSuccess: (data) => {
			const { email, nickName, englishLevel } = data
			setIsAuthenticated(true, email, nickName, englishLevel)
			navigate(`/${PrivateRoutes.DASHBOARD}`)
		},
		retry: 2,
	})

	return {
		mutation,
	}
}
