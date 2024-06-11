import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"

type AuthStore = {
	userNickName: string
	userFullName: string
	userEmail: string
	userProfileImage: string
	userEnglishLevel: string
	token: string
	setNickName: (nickName: string) => void
	setFullName: (fullName: string) => void
	setEmail: (email: string) => void
	setProfileImage: (profileImage: string) => void
	setToken: (token: string) => void
	setUserEnglishLevel: (englishLevel: string) => void
}

const userAPI: StateCreator<AuthStore> = (set) => ({
	userNickName: "",
	userFullName: "",
	userEmail: "",
	userEnglishLevel: "",
	userProfileImage: "",
	token: "",
	setNickName: (nickName: string) => set({ userNickName: nickName }),
	setFullName: (fullName: string) => set({ userFullName: fullName }),
	setUserEnglishLevel: (englishLevel: string) =>
		set({ userEnglishLevel: englishLevel }),
	setEmail: (email: string) => set({ userEmail: email }),
	setProfileImage: (profileImage: string) =>
		set({ userProfileImage: profileImage }),
	setToken: (token: string) => set({ token: token }),
})

export const usePersonStore = create<AuthStore>()(
	persist(userAPI, { name: "auth-store" }),
)
