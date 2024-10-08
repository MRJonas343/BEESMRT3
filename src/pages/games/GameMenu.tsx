import { Typography, NavBar, StaticPagesLayout } from "@/components"
import GameCard from "./components/GameCard"
import { games } from "./constant/availableGames"

const GameMenu = () => {
	return (
		<StaticPagesLayout
			title="Games"
			index="follow"
			metaDescription="Play games and have fun with Beesmrt Games"
			className="h-screen"
		>
			<NavBar />
			<Typography
				className="pt-3 text-center lg:pt-8 lg:text-5xl animate-bouncing animate-iteration-count-infinite"
				textType="MegaTitle"
			>
				BEESMRT GAMES
			</Typography>
			<section className="grid grid-cols-2 justify-items-center gap-4 h-[84vh] md:h-[82vh] lg:flex lg:justify-center lg:items-center lg:gap-4 lg:h-[70vh]">
				{games.map((game, index) => (
					<GameCard
						key={index}
						imageSrc={game.imageSrc}
						title={game.title}
						text={game.text}
					/>
				))}
			</section>
		</StaticPagesLayout>
	)
}
export default GameMenu
