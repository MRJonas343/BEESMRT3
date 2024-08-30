import { lazy } from "react"
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { PremiumRoutes, PrivateRoutes, PublicRoutes } from "./models/routes"
import NotFound from "./components/stateless/NotFound"

//* Guard components
const HomeGuard = lazy(() => import("./guards/home.guard"))
const AuthGuard = lazy(() => import("./guards/auth.private.guard"))
const PremiumGuard = lazy(() => import("./guards/auth.premium.guard"))

//* Public Routes
const Home = lazy(() => import("./pages/public/home/Home"))
const Login = lazy(() => import("./pages/public/login/Login"))
const SignUp = lazy(() => import("./pages/public/signUp/SignUp"))
const About = lazy(() => import("./pages/public/about/About"))
const Contact = lazy(() => import("./pages/public/contact/Contact"))
const PrivacyPolicy = lazy(
	() => import("./pages/public/privacyPolicy/PrivacyPolicy"),
)

//* Private Routes
const Dashboard = lazy(
	() => import("./pages/private/normalUsers/dashboard/Dashboard"),
)
const LeaderBoard = lazy(
	() => import("./pages/private/normalUsers/leaderBoard/LeaderBoard"),
)
const Events = lazy(() => import("./pages/private/normalUsers/events/Events"))
const Friends = lazy(
	() => import("./pages/private/normalUsers/friends/Friends"),
)
const Tournaments = lazy(
	() => import("./pages/private/normalUsers/tournaments/Tournaments"),
)
const MemoryGameSingleMode = lazy(
	() => import("./pages/games/MemoryGame/singleMode/MemoryGameSingleMode"),
)
const GameMenu = lazy(() => import("./pages/games/GameMenu"))

//* Premium Routes
const Forge = lazy(() => import("./pages/private/premiumUsers/forge/Forge"))
const OnlineMode = lazy(
	() => import("./pages/private/premiumUsers/onlineMode/OnlineMode"),
)
const PremiumContent = lazy(
	() => import("./pages/private/premiumUsers/premiumContent/PremiumContent"),
)
const TournamentCreator = lazy(
	() =>
		import("./pages/private/premiumUsers/tournamentsCreator/TournamentCreator"),
)
const NextUIWrapper = () => {
	const navigate = useNavigate()

	return (
		<NextUIProvider navigate={navigate}>
			<Outlet />
		</NextUIProvider>
	)
}

export const router = createBrowserRouter([
	{
		//* Public Routes
		element: <NextUIWrapper />,
		children: [
			{
				path: "/",
				element: (
					<HomeGuard>
						<Home />
					</HomeGuard>
				),
			},
			{
				path: PublicRoutes.LOGIN,
				element: (
					<HomeGuard>
						<Login />
					</HomeGuard>
				),
			},
			{
				path: PublicRoutes.SIGNUP,
				element: (
					<HomeGuard>
						<SignUp />
					</HomeGuard>
				),
			},
			{
				path: PublicRoutes.ABOUT,
				element: <About />,
			},
			{
				path: PublicRoutes.CONTACT,
				element: <Contact />,
			},
			{
				path: PublicRoutes.PRIVACYPOLICY,
				element: <PrivacyPolicy />,
			},

			//*Private Routes
			{
				path: PrivateRoutes.DASHBOARD,
				element: (
					<AuthGuard>
						<Dashboard />
					</AuthGuard>
				),
			},
			{
				path: PrivateRoutes.LEADERBOARD,
				element: (
					<AuthGuard>
						<LeaderBoard />
					</AuthGuard>
				),
			},
			{
				path: PrivateRoutes.EVENTS,
				element: (
					<AuthGuard>
						<Events />
					</AuthGuard>
				),
			},
			{
				path: PrivateRoutes.FRIENDS,
				element: (
					<AuthGuard>
						<Friends />
					</AuthGuard>
				),
			},
			{
				path: PrivateRoutes.TOURNAMENTS,
				element: (
					<AuthGuard>
						<Tournaments />
					</AuthGuard>
				),
			},
			{
				path: PrivateRoutes.GAMEMENU,
				element: (
					<AuthGuard>
						<GameMenu />
					</AuthGuard>
				),
			},
			{
				path: PrivateRoutes.MEMORYGAMESINGLEMODE,
				element: (
					<AuthGuard>
						<MemoryGameSingleMode />
					</AuthGuard>
				),
			},
			//* Premium Routes
			{
				path: PremiumRoutes.FORGE,
				element: (
					<PremiumGuard>
						<Forge />
					</PremiumGuard>
				),
			},
			{
				path: PremiumRoutes.ONLINEMODE,
				element: (
					<PremiumGuard>
						<OnlineMode />
					</PremiumGuard>
				),
			},
			{
				path: PremiumRoutes.PREMIUMCONTENT,
				element: (
					<PremiumGuard>
						<PremiumContent />
					</PremiumGuard>
				),
			},
			{
				path: PremiumRoutes.TOURNAMENTCREATOR,
				element: (
					<PremiumGuard>
						<TournamentCreator />
					</PremiumGuard>
				),
			},
		],
	},
	{ path: "*", element: <NotFound /> },
])
