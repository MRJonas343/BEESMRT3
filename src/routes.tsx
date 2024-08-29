import { lazy } from "react"
import { Route, useNavigate } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { RoutesWithNotFound } from "./utils"
import { PremiumRoutes, PrivateRoutes, PublicRoutes } from "./models/routes"

//*Guard components
const HomeGuard = lazy(() => import("./guards/home.guard"))
const AuthGuard = lazy(() => import("./guards/auth.private.guard"))
const PremiumGuard = lazy(() => import("./guards/auth.premium.guard"))

//*Pagez components
const Home = lazy(() => import("./pages/public/home/Home"))
const Login = lazy(() => import("./pages/public/login/Login"))
const SignUp = lazy(() => import("./pages/public/signUp/SignUp"))
const About = lazy(() => import("./pages/public/about/About"))
const Contact = lazy(() => import("./pages/public/contact/Contact"))
const PrivacyPolicy = lazy(
	() => import("./pages/public/privacyPolicy/PrivacyPolicy"),
)

//*Concated Pages
const Premium = lazy(() => import("./pages/private/Premium"))
const Private = lazy(() => import("./pages/private/Private"))

const RoutesTree = () => {
	const navigate = useNavigate()

	return (
		<NextUIProvider navigate={navigate}>
			<RoutesWithNotFound>
				{/* Public Routes */}
				<Route element={<HomeGuard />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route path={PublicRoutes.LOGIN} element={<Login />} />
				<Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
				<Route path={PublicRoutes.ABOUT} element={<About />} />
				<Route path={PublicRoutes.PRIVACYPOLICY} element={<PrivacyPolicy />} />
				<Route path={PublicRoutes.CONTACT} element={<Contact />} />

				{/* Private Routes */}
				<Route element={<AuthGuard />}>
					<Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
				</Route>

				{/* Premium Routes */}
				<Route element={<PremiumGuard />}>
					<Route path={`${PremiumRoutes.PREMIUM}/*`} element={<Premium />} />
				</Route>
			</RoutesWithNotFound>
		</NextUIProvider>
	)
}

export default RoutesTree
