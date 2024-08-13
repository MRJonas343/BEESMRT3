import { beesmartApi } from "@/api/beesmrt.api"
import { APIROUTES } from "@/models/Api.routes"

const createUserService = async (
	email: string,
	password: string,
	nickName: string,
	englishLevel: string,
) => {
	const { data } = await beesmartApi.post(APIROUTES.signup, {
		email,
		password,
		nickName,
		englishLevel,
	})
	return data
}

export default createUserService
