import { Routes, Route } from "react-router-dom"
//? TODO Create the NotFound component
interface props {
	children: JSX.Element[] | JSX.Element | React.ReactNode
}
export const RoutesWithNotFound = ({ children }: props) => {
	return (
		<Routes>
			{children}
			<Route path="*" element={<div>Not Found</div>} />
		</Routes>
	)
}
