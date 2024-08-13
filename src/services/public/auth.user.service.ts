import { beesmartApi } from "@/api/beesmrt.api"
import { APIROUTES } from "@/models/Api.routes"

const authUserService = async (email: string, password: string) => {
	const { data } = await beesmartApi.post(APIROUTES.login, {
		email,
		password,
	})
	return data
}

export default authUserService
