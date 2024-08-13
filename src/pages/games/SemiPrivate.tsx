import { lazy } from "react"
import { Navigate, Route } from "react-router-dom"
import { SemiPrivateRoutes } from "@/models/routes"
import RoutesWithNotFound from "@/utils/RoutesWithNotFound"

const GameMenu = lazy(() => import("./GameMenu"))
const MemoryGameSingleMode = lazy(
	() => import("./MemoryGame/singleMode/MemoryGameSingleMode"),
)

const SemiPrivate = () => {
	return (
		<RoutesWithNotFound>
			<Route path="/" element={<Navigate to={SemiPrivateRoutes.GAMEMENU} />} />
			<Route path={SemiPrivateRoutes.GAMEMENU} element={<GameMenu />} />
			<Route
				path={SemiPrivateRoutes.MEMORYGAMESINGLEMODE}
				element={<MemoryGameSingleMode />}
			/>
		</RoutesWithNotFound>
	)
}

export default SemiPrivate
