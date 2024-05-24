import { Link } from "react-router-dom"

const NotFound = () => {
	return (
		<main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
			<h1 className="animate-tilt pt-4 animate-duration-1000 animate-iteration-count-infinite  text-4xl text-center pb-3 text-white text-3d2 font-Principal tracking-wide from-neutral-400 md:text-4xl md:py-5 lg:text-6xl xl:py-6">
				404 Not Found
			</h1>
			<h2 className="text-white text-center text-2xl font-Secundaria">
				The page you are looking for does not exist.
			</h2>
			<Link to="/">
				<div className="flex justify-center mt-4">
					<button
						type="button"
						className="font-Principal px-8 text-white bg-blue-600 py-4 focus:outline-none hover:bg-blue-900 rounded text-xl shadow-xl"
					>
						Go back to BeeSMRT
					</button>
				</div>
			</Link>
		</main>
	)
}
export default NotFound
