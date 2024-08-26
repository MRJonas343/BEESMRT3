import { beesmartApi } from "@/api/beesmrt.api"
import { APIROUTES } from "@/models/Api.routes"
import { AuthUserResponse } from "../interfaces/authUserResponde"

const authUserService = async (email: string, password: string) => {
	const { data } = await beesmartApi.post<AuthUserResponse>(APIROUTES.login, {
		email,
		password,
	})
	return data
}

export default authUserService
