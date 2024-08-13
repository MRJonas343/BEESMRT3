import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes, PremiumRoutes } from "../../models/routes"
import RoutesWithNotFound from "../../utils/RoutesWithNotFound"
import { lazy } from "react"

const Forge = lazy(() => import("./premiumUsers/forge/Forge"))
const OnlineMode = lazy(() => import("./premiumUsers/onlineMode/OnlineMode"))
const PremiumContent = lazy(
	() => import("./premiumUsers/premiumContent/PremiumContent"),
)
const TournamentCreator = lazy(
	() => import("./premiumUsers/tournamentsCreator/TournamentCreator"),
)

const Premium = () => {
	return (
		<RoutesWithNotFound>
			<Route path="/" element={<Navigate to={`/${PrivateRoutes.PRIVATE}`} />} />
			<Route path={PremiumRoutes.FORGE} element={<Forge />} />
			<Route path={PremiumRoutes.ONLINEMODE} element={<OnlineMode />} />
			<Route path={PremiumRoutes.PREMIUMCONTENT} element={<PremiumContent />} />
			<Route
				path={PremiumRoutes.TOURNAMENTCREATOR}
				element={<TournamentCreator />}
			/>
		</RoutesWithNotFound>
	)
}

export default Premium
