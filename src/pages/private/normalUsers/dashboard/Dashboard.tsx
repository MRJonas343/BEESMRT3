import MainButton from "@/components/stateful/MainButton"
import useAuthStore from "@/context/Auth.context"

const Dashboard = () => {
	const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
	const logOut = () => {
		setIsAuthenticated(false)
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
