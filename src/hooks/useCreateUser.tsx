import { useMutation } from "@tanstack/react-query"
import { FormValues } from "@/models/FormValues"
import createUserService from "@/services/public/create.user.service"
import { useNavigate } from "react-router-dom"
import { PrivateRoutes } from "@/models/routes"
import useAuthStore from "@/context/Auth.context"

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
			navigate(`/${PrivateRoutes.PRIVATE}`)
		},
		retry: 2,
	})

	return {
		mutation,
	}
}
