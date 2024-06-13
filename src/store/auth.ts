import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"

type AuthStore = {
	userNickName: string | null
	userFullName: string | null
	userEmail: string | null
	userProfileImage: string | null
	userEnglishLevel: string | null
	token: string | null
	setNickName: (nickName: string | null) => void
	setFullName: (fullName: string | null) => void
	setEmail: (email: string | null) => void
	setProfileImage: (profileImage: string | null) => void
	setToken: (token: string | null) => void
	setUserEnglishLevel: (englishLevel: string | null) => void
}

const userAPI: StateCreator<AuthStore> = (set) => ({
	userNickName: null,
	userFullName: null,
	userEmail: null,
	userEnglishLevel: null,
	userProfileImage: null,
	token: null,
	setNickName: (nickName: string | null) => set({ userNickName: nickName }),
	setFullName: (fullName: string | null) => set({ userFullName: fullName }),
	setUserEnglishLevel: (englishLevel: string | null) =>
		set({ userEnglishLevel: englishLevel }),
	setEmail: (email: string | null) => set({ userEmail: email }),
	setProfileImage: (profileImage: string | null) =>
		set({ userProfileImage: profileImage }),
	setToken: (token: string | null) => set({ token: token }),
})

export const usePersonStore = create<AuthStore>()(
	persist(userAPI, { name: "auth-store" }),
)
