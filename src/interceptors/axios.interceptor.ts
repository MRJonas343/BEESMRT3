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
			console.log({ error: error })
			displayToastError(getValidationError(error.code))
			return Promise.reject(error)
		},
	)
}

/* beesmartApi.interceptors.request.use((request) => {
	 if(request.url?.includes("update")) {
	 	//*If I'll face a problem with the request because
		//*is multipart/form-data I'll use the following code	
	 return request
	 }
	})
 */
