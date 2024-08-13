import { useMutation } from "@tanstack/react-query"
import { FormValues } from "@/models/FormValues"
import createUserService from "@/services/public/create.user.service"
import { useNavigate } from "react-router-dom"
import { PublicRoutes } from "@/models/routes"

export const useCreateUser = () => {
	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: (data: FormValues) =>
			createUserService(
				data.email,
				data.password,
				data.nickName,
				data.englishLevel.toUpperCase(),
			),
		onSuccess: () => {
			navigate(`/${PublicRoutes.LOGIN}`)
		},
		retry: 2,
	})

	return {
		mutation,
	}
}
