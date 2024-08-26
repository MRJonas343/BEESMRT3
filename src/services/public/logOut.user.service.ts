import { beesmartApi } from "@/api/beesmrt.api"
import { APIROUTES } from "@/models/Api.routes"

const logOutService = async () => {
	const { data } = await beesmartApi.post(APIROUTES.logout)
	return data
}

export default logOutService
