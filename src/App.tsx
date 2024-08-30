import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import { Loader } from "./components"
import { router } from "./routes"

const App = () => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<Loader />}>
				<RouterProvider router={router} />
				<Toaster />
			</Suspense>
		</QueryClientProvider>
	)
}

export default App
