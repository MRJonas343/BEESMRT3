import { getValidationError } from "@/utils/getValidationError"
import { AxiosInstance } from "axios"
import { APIROUTES } from "@/models"
import { displayToastError, logOutFunction } from "@/utils"

export const axiosInterceptor = (beesmartApi: AxiosInstance) => {
	beesmartApi.interceptors.request.use((request) => {
		request.withCredentials = true
		return request
	})

	beesmartApi.interceptors.response.use(
		(response) => {
			return response
		},
		async (error) => {
			const originalRequest = error.config
			const codeError: string = error.response?.data?.error || error.code

			//*Check if the error is a token expired error
			if (codeError === "ERR_TOKEN_EXPIRED" && !originalRequest._retry) {
				originalRequest._retry = true

				try {
					//*Try to refresh the token
					await beesmartApi.post(APIROUTES.refreshToken)

					//*If the token is refreshed, retry the original request
					return beesmartApi(originalRequest)
				} catch (refreshError) {
					if (refreshError instanceof Error) {
						displayToastError(
							getValidationError(
								refreshError.message || "Ups! Something went wrong.",
							),
						)
					} else {
						displayToastError("Ups! Something went wrong.")
					}
					return Promise.reject(refreshError)
				}
			}
			//*Check if is invalid Credentials error
			if (codeError === "ERR_INVALID_CREDENTIALS") {
				logOutFunction()
				return Promise.reject(error)
			}
			displayToastError(getValidationError(codeError))
			return Promise.reject(error)
		},
	)
}
