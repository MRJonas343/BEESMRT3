import { PrivateRoutes, PublicRoutes } from "@/models/routes"

export const routeConfigs = {
	public: [
		{ avialableRoute: `/${PublicRoutes.SIGNUP}`, routeName: "Sign Up" },
		{
			avialableRoute: `/${PublicRoutes.CONTACT}`,
			routeName: "Contact Us",
		},
		{ avialableRoute: `/${PublicRoutes.ABOUT}`, routeName: "About Us" },
	],
	private: [
		{
			avialableRoute: `/${PrivateRoutes.FRIENDS}`,
			routeName: "Friends",
		},
		{
			avialableRoute: `/${PrivateRoutes.EVENTS}`,
			routeName: "Events",
		},
		{ avialableRoute: `/${PublicRoutes.ABOUT}`, routeName: "About Us" },
	],
}
