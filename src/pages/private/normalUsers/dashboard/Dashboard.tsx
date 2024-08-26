import { MainButton } from "@/components"
import { useLogOut } from "@/hooks/useLogOut"

const Dashboard = () => {
	const { mutation } = useLogOut()

	const logOut = () => {
		mutation.mutate()
	}

	return (
		<>
			<h1>Dashboard</h1>
			<p>This component will show the user info and will word</p>
			<p>as a point center if the user try to come by /private o /premium</p>
			<MainButton type="button" onClick={logOut}>
				Log Out
			</MainButton>
		</>
	)
}
export default Dashboard
