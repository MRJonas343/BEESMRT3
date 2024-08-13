import { StaticPagesLayout } from "./layouts/StaticPagesLayout"
import LoaderImage from "@assets/loader1.svg"

export const Loader = () => {
	return (
		<StaticPagesLayout className="h-screen">
			<div className="flex items-center justify-center h-full">
				<img src={LoaderImage} alt="loader" />
			</div>
		</StaticPagesLayout>
	)
}
