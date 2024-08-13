import RoutesTree from "./routes.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import Loader from "./components/stateless/Loader.tsx"
const App = () => {
	const queryClient = new QueryClient()

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<Loader />}>
					<BrowserRouter>
						<RoutesTree />
					</BrowserRouter>
					<Toaster />
				</Suspense>
			</QueryClientProvider>
		</>
	)
}

export default App
