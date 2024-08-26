import { getValidationError } from "@/utils/getValidationError"
import { AxiosInstance } from "axios"
import { displayToastError } from "@/utils/displayToatError"

export const axiosInterceptor = (beesmartApi: AxiosInstance) => {
	beesmartApi.interceptors.request.use((request) => {
		request.withCredentials = true
		//? TODO : Add the email of the user to the request headers
		const emailTest = "email@email.com"
		request.headers.set("email", emailTest)
		return request
	})

	beesmartApi.interceptors.response.use(
		(response) => {
			//console.log({ response: response })
			return response
		},
		(error) => {
			const codeError = error.response?.data?.error || error.code
			displayToastError(getValidationError(codeError))
			return Promise.reject(error)
		},
	)
}
