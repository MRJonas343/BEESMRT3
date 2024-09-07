import useAuthStore from "@/store/Auth.store"
import logoWhite from "@assets/logo_white.webp"
import { PrivateRoutes, PublicRoutes } from "@/models"
import { FC, useState } from "react"
import { routeConfigs } from "./constant/routeConfigs"
import { NavLink } from "react-router-dom"

export const NavBar: FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const buttonMenuClassName = isMenuOpen
		? "bg-close-menu w-5 h-5 bg-cover bg-center cursor-pointer transition-all z-50 md:hidden"
		: "bg-open-menu w-5 h-5 bg-cover bg-center cursor-pointer transition-all z-50 md:hidden "

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const avialableRoutes = isAuthenticated
		? routeConfigs.private
		: routeConfigs.public

	return (
		<nav className="w-[95%] pt-4 px-4 mx-auto overflow-hidden h-12 flex items-center justify-between font-Principal text-3xl text-3d text-white xl:w-screen xl:px-12">
			<NavLink
				to={isAuthenticated ? `/${PrivateRoutes.GAMEMENU}` : "/"}
				className="w-1/3 max-w-[240px] hover:scale-110 ease-in-out duration-200"
			>
				<img alt="logo" src={logoWhite} className="w-40" />
			</NavLink>

			<label
				htmlFor="btn-open-menu"
				className={buttonMenuClassName}
				onClick={toggleMenu}
			/>

			<input id="btn-open-menu" type="checkbox" className="hidden peer" />

			<div className="fixed inset-0 top-0 left-0 z-40 flex items-center justify-center w-screen h-screen transition-transform translate-x-full lg:backdrop-blur-0 backdrop-blur-2xl md:bg-transparent peer-checked:translate-x-0 md:static md:translate-x-0 md:backdrop-blur-none">
				<div className="lg:mr-28">
					<ul className="tracking-wide bg-white/80 shadow-xl absolute inset-x-0 top-24 p-12 w-[90%] mx-auto rounded-lg h-max text-center grid gap-10 md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
						{avialableRoutes.map((route, index) => (
							<NavLink
								key={index}
								to={route.avialableRoute}
								onClick={toggleMenu}
								className={({ isActive }) =>
									isActive
										? "duration-200 tracking-wider ease-in-out text-Yellow1 hover:scale-110"
										: "duration-200 tracking-wider ease-in-out hover:scale-110"
								}
							>
								{route.routeName}
							</NavLink>
						))}
						<NavLink
							to={
								isAuthenticated
									? `/${PrivateRoutes.DASHBOARD}`
									: `/${PublicRoutes.LOGIN}`
							}
							className={({ isActive }) =>
								isActive
									? "duration-200 tracking-wider ease-in-out text-Yellow1 hover:scale-110 lg:hidden"
									: "duration-200 tracking-wider ease-in-out hover:scale-110 lg:hidden"
							}
							onClick={toggleMenu}
						>
							{isAuthenticated ? "Dashboard" : "Log in"}
						</NavLink>
					</ul>
				</div>
			</div>
			<NavLink
				to={
					isAuthenticated
						? `/${PrivateRoutes.DASHBOARD}`
						: `/${PublicRoutes.LOGIN}`
				}
				className={({ isActive }) =>
					isActive
						? "duration-200 tracking-wider ease-in-out text-Yellow1 hover:scale-110 hidden lg:block"
						: "duration-200 tracking-wider ease-in-out hover:scale-110 hidden lg:block"
				}
			>
				<button type="button" className="hidden lg:block w-max text-3d">
					{isAuthenticated ? "Dashboard" : "Start Playing"}
				</button>
			</NavLink>
		</nav>
	)
}
