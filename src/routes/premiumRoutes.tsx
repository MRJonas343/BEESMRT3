import { PremiumRoutes } from "@/models/routes"
import { lazy } from "react"

//* Guard
const PremiumGuard = lazy(() => import("../guards/auth.premium.guard"))

//* Premium Routes
const Forge = lazy(() => import("../pages/private/premiumUsers/forge/Forge"))
const OnlineMode = lazy(
	() => import("../pages/private/premiumUsers/onlineMode/OnlineMode"),
)
const PremiumContent = lazy(
	() => import("../pages/private/premiumUsers/premiumContent/PremiumContent"),
)
const TournamentCreator = lazy(
	() =>
		import(
			"../pages/private/premiumUsers/tournamentsCreator/TournamentCreator"
		),
)

export const premiumRoutes = {
	element: <PremiumGuard />,
	children: [
		{ path: PremiumRoutes.FORGE, element: <Forge /> },
		{ path: PremiumRoutes.ONLINEMODE, element: <OnlineMode /> },
		{ path: PremiumRoutes.PREMIUMCONTENT, element: <PremiumContent /> },
		{ path: PremiumRoutes.TOURNAMENTCREATOR, element: <TournamentCreator /> },
	],
}
