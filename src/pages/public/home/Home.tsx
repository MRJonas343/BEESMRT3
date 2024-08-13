import StaticPagesLayout from "@/components/stateless/layouts/StaticPagesLayout"
import Typography from "@/components/stateless/Typography"
import NavBar from "@/components/stateful/NavBar"
const Home = () => {
	return (
		<StaticPagesLayout>
			<NavBar />
			<section className="p-4">
				<Typography
					textType="MegaTitle"
					className="text-center animate-bouncing"
				>
					BEESMRT GAMES
				</Typography>

				<Typography className="" textType="paragraph">
					This componente will be used as a presentation for the app
				</Typography>
				<Typography textType="paragraph" className="pb-10">
					To achieve a good CEO and would be serve from the server
				</Typography>
			</section>
		</StaticPagesLayout>
	)
}
export default Home
