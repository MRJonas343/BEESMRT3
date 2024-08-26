import type { StateCreator } from "zustand"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
	isAuthenticated: boolean
	isPremium: boolean
	email: string | null
	nickName: string | null
	englishLevel: string | null
	setIsAuthenticated: (
		isAuthenticated: boolean,
		email: string,
		nickName: string,
		englishLevel: string,
	) => void
	setIsPremium: (isPremium: boolean) => void
	cleanStore: () => void
}

const userAPI: StateCreator<AuthState> = (set) => ({
	isAuthenticated: false,
	isPremium: false,
	email: null,
	nickName: null,
	englishLevel: null,
	setIsAuthenticated: (isAuthenticated, email, nickName, englishLevel) => {
		set({ isAuthenticated, email, nickName, englishLevel })
	},
	setIsPremium: (isPremium) => set({ isPremium }),
	cleanStore: () =>
		set({
			isAuthenticated: false,
			isPremium: false,
			email: null,
			nickName: null,
			englishLevel: null,
		}),
})

const useAuthStore = create<AuthState>()(
	persist(userAPI, { name: "auth-store" }),
)

export default useAuthStore
