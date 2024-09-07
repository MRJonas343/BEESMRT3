import { beesmartApi } from "@/api"
import { MainButton } from "@/components"
import { useLogOut } from "@/hooks/useLogOut"
import { NavBar } from "@/components"

const Dashboard = () => {
	const { mutation } = useLogOut()

	const logOut = () => {
		mutation.mutate()
	}

	const testGetProtectedData = async () => {
		const data = await beesmartApi.get("/levels/getLevels?game=MemoryGame")
		console.log(data)
	}

	return (
		<>
			<NavBar />
			<h1>Dashboard</h1>
			<p>This component will show the user info and will word</p>
			<p>as a point center if the user try to come by /private o /premium</p>
			<MainButton type="button" onClick={logOut}>
				Log Out
			</MainButton>

			<MainButton type="button" onClick={testGetProtectedData}>
				Test Get Protected Data
			</MainButton>
		</>
	)
}
export default Dashboard
