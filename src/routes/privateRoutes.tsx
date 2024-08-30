import { PrivateRoutes } from "@/models/routes"
import { lazy } from "react"

//* Guard
const AuthGuard = lazy(() => import("../guards/auth.private.guard"))

//* Private Routes
const Dashboard = lazy(
	() => import("../pages/private/normalUsers/dashboard/Dashboard"),
)
const LeaderBoard = lazy(
	() => import("../pages/private/normalUsers/leaderBoard/LeaderBoard"),
)
const Events = lazy(() => import("../pages/private/normalUsers/events/Events"))
const Friends = lazy(
	() => import("../pages/private/normalUsers/friends/Friends"),
)
const Tournaments = lazy(
	() => import("../pages/private/normalUsers/tournaments/Tournaments"),
)
const MemoryGameSingleMode = lazy(
	() => import("../pages/games/MemoryGame/singleMode/MemoryGameSingleMode"),
)
const GameMenu = lazy(() => import("../pages/games/GameMenu"))

export const privateRoutes = {
	element: <AuthGuard />,
	children: [
		{ path: PrivateRoutes.DASHBOARD, element: <Dashboard /> },
		{ path: PrivateRoutes.LEADERBOARD, element: <LeaderBoard /> },
		{ path: PrivateRoutes.EVENTS, element: <Events /> },
		{ path: PrivateRoutes.FRIENDS, element: <Friends /> },
		{ path: PrivateRoutes.TOURNAMENTS, element: <Tournaments /> },
		{ path: PrivateRoutes.GAMEMENU, element: <GameMenu /> },
		{
			path: PrivateRoutes.MEMORYGAMESINGLEMODE,
			element: <MemoryGameSingleMode />,
		},
	],
}
