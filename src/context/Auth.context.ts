import type { StateCreator } from "zustand"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
	isAuthenticated: boolean
	isPremium: boolean
	setIsAuthenticated: (isAuthenticated: boolean) => void
	setIsPremium: (isPremium: boolean) => void
}

const userAPI: StateCreator<AuthState> = (set) => ({
	isAuthenticated: false,
	isPremium: false,
	setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
	setIsPremium: (isPremium) => set({ isPremium }),
})

const useAuthStore = create<AuthState>()(
	persist(userAPI, { name: "auth-store" }),
)

export default useAuthStore
