import { NavBar, StaticPagesLayout, Typography } from "@/components"

const Home = () => {
	return (
		<StaticPagesLayout
			title="BEESMRT"
			index="follow"
			metaDescription="Immerse yourself in an engaging English learning experience with our web app featuring educational games. Practice vocabulary, grammar, and conversation in a fun and effective way. Explore interactive challenges, enhance your language skills, and enjoy the journey to mastering the English language. Dive into entertaining and impactful education now!"
			className="h-screen"
		>
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
