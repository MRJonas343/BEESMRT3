import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes } from "../../models/routes"
import { RoutesWithNotFound } from "@/utils"

const Dashboard = lazy(() => import("./normalUsers/dashboard/Dashboard"))
const LeaderBoard = lazy(() => import("./normalUsers/leaderBoard/LeaderBoard"))
const Events = lazy(() => import("./normalUsers/events/Events"))
const Friends = lazy(() => import("./normalUsers/friends/Friends"))
const Tournaments = lazy(() => import("./normalUsers/tournaments/Tournaments"))
const LEADERBOARD = lazy(() => import("./normalUsers/leaderBoard/LeaderBoard"))
const MemoryGameSingleMode = lazy(
	() => import("../games/MemoryGame/singleMode/MemoryGameSingleMode"),
)
const GameMenu = lazy(() => import("../games/GameMenu"))

const Private = () => {
	return (
		<RoutesWithNotFound>
			<Route path="/" element={<Navigate to={PrivateRoutes.GAMEMENU} />} />
			<Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
			<Route path={PrivateRoutes.EVENTS} element={<Events />} />
			<Route path={PrivateRoutes.LEADERBOARD} element={<LeaderBoard />} />
			<Route path={PrivateRoutes.FRIENDS} element={<Friends />} />
			<Route path={PrivateRoutes.TOURNAMENTS} element={<Tournaments />} />
			<Route path={PrivateRoutes.LEADERBOARD} element={<LEADERBOARD />} />
			<Route path={PrivateRoutes.GAMEMENU} element={<GameMenu />} />
			<Route
				path={PrivateRoutes.MEMORYGAMESINGLEMODE}
				element={<MemoryGameSingleMode />}
			/>
		</RoutesWithNotFound>
	)
}

export default Private
