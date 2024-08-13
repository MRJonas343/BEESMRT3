import { lazy } from "react"
import { Route, useNavigate } from "react-router-dom"
import RoutesWithNotFound from "./utils/RoutesWithNotFound"
import {
	PremiumRoutes,
	PrivateRoutes,
	PublicRoutes,
	SemiPrivateRoutes,
} from "./models/routes"
import AuthGuard from "./guards/auth.protected.guard"
import GamesGuard from "./guards/games.semiprotected.guard"
import PremiumGuard from "./guards/auth.premium.guard"

const HomeGuard = lazy(() => import("./guards/home.guard"))
const Home = lazy(() => import("./pages/public/home/Home"))
const Login = lazy(() => import("./pages/public/login/Login"))
const SignUp = lazy(() => import("./pages/public/signUp/SignUp"))
const About = lazy(() => import("./pages/public/about/About"))
const PrivacyPolicy = lazy(
	() => import("./pages/public/privacyPolicy/PrivacyPolicy"),
)
const SemiPrivate = lazy(() => import("./pages/games/SemiPrivate"))
const Private = lazy(() => import("./pages/private/Private"))
import Contact from "./pages/public/contact/Contact"
import Premium from "./pages/private/Premium"
import { NextUIProvider } from "@nextui-org/react"

const RoutesTree = () => {
	const navigate = useNavigate()

	return (
		<NextUIProvider navigate={navigate}>
			<RoutesWithNotFound>
				<Route element={<HomeGuard />}>
					<Route path="/" element={<Home />} />
				</Route>

				<Route path={PublicRoutes.LOGIN} element={<Login />} />
				<Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
				<Route path={PublicRoutes.ABOUT} element={<About />} />
				<Route path={PublicRoutes.PRIVACYPOLICY} element={<PrivacyPolicy />} />
				<Route path={PublicRoutes.CONTACT} element={<Contact />} />
				<Route element={<AuthGuard />}>
					<Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
				</Route>

				<Route element={<GamesGuard />}>
					<Route
						path={`${SemiPrivateRoutes.SEMIPRIVATE}/*`}
						element={<SemiPrivate />}
					/>
				</Route>

				<Route element={<PremiumGuard />}>
					<Route path={`${PremiumRoutes.PREMIUM}/*`} element={<Premium />} />
				</Route>
			</RoutesWithNotFound>
		</NextUIProvider>
	)
}

export default RoutesTree
