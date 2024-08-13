import axios from "axios"

export const beesmartApi = axios.create({
	baseURL: String(import.meta.env.VITE_BEESMRT_API),
})
