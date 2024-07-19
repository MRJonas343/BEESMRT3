import { Link } from "react-router-dom"

//* Components
import NavBar from "@components/NavBar"
import HomeCard from "@components/HomeCard"

//* Assets
import MemoryGameImg from "@assets/memoryGame.webp"
import HangmanImg from "@assets/hangmanImg.webp"
import DragImg from "@assets/dragDropGame.webp"
import SentencesScrambleImg from "@assets/scrambler.webp"

const HomePage: React.FC = () => {
	return (
		<main className="w-screen h-screen bg-Gradient2 overflow-x-hidden">
			<NavBar />

			<h1 className="animate-tilt animate-duration-1000 animate-iteration-count-infinite  text-4xl text-center pb-3 text-white text-3d3 font-Principal tracking-wide from-neutral-400 md:text-4xl md:py-5 lg:text-6xl xl:py-6 text-sh xl:pb-0 xl:pt-10">
				BEESMRT GAMES
			</h1>
			<section className="grid grid-cols-2 justify-items-center gap-4 h-[84dvh] md:h-[82dvh] lg:flex lg:justify-center lg:items-center lg:gap-4 lg:h-[70dvh]">
				<Link to="/games/memorygameMode" className="flex">
					<HomeCard
						imageSrc={MemoryGameImg}
						title="Memory Game"
						text="Find all the pairs and answer the questions correctly to earn points."
					/>
				</Link>

				<Link to="/games/hangmangameMode" className="flex">
					<HomeCard
						imageSrc={HangmanImg}
						title="Hangman"
						text="Practice your vocabulary with a hangman, try to solve it before he is executed."
					/>
				</Link>

				<Link to="/games/dragdropgameMode" className="flex">
					<HomeCard
						imageSrc={DragImg}
						title="Drag and Drop"
						text="Drag and drop the images to the correct place!!!"
					/>
				</Link>

				<Link to="/games/sentenceScrambleMode" className="flex">
					<HomeCard
						imageSrc={SentencesScrambleImg}
						title="Scramble Sentences"
						text="Unscramble the sentences to form a correct sentence."
					/>
				</Link>
			</section>
		</main>
	)
}

export default HomePage
