import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthStore = {
	token: string
	setToken: (token: string) => void
}

export const useAuthStore = create(
	persist<AuthStore>(
		(set) => ({
			token: "",
			setToken: (token) =>
				set(() => ({
					token,
				})),
		}),
		{
			name: "auth",
		},
	),
)
