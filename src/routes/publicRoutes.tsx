import { lazy } from "react"
import { PublicRoutes } from "@/models/routes"

//* Guard component
const HomeGuard = lazy(() => import("../guards/home.guard"))

//* Public Routes
const Home = lazy(() => import("../pages/public/home/Home"))
const Login = lazy(() => import("../pages/public/login/Login"))
const SignUp = lazy(() => import("../pages/public/signUp/SignUp"))
const About = lazy(() => import("../pages/public/about/About"))
const Contact = lazy(() => import("../pages/public/contact/Contact"))
const PrivacyPolicy = lazy(
	() => import("../pages/public/privacyPolicy/PrivacyPolicy"),
)
const NotFound = lazy(() => import("../components/stateless/NotFound"))

export const publicRoutes = [
	{
		element: <HomeGuard />,
		children: [
			{ path: "", element: <Home /> },
			{ path: PublicRoutes.LOGIN, element: <Login /> },
			{ path: PublicRoutes.SIGNUP, element: <SignUp /> },
		],
	},
	{ path: PublicRoutes.ABOUT, element: <About /> },
	{ path: PublicRoutes.CONTACT, element: <Contact /> },
	{ path: PublicRoutes.PRIVACYPOLICY, element: <PrivacyPolicy /> },
	{ path: "*", element: <NotFound /> },
]
