import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"
import { premiumRoutes } from "./premiumRoutes"
import { privateRoutes } from "./privateRoutes"
import { publicRoutes } from "./publicRoutes"

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
		element: <NextUIWrapper />,
		path: "/",
		children: [...publicRoutes, privateRoutes, premiumRoutes],
	},
])
