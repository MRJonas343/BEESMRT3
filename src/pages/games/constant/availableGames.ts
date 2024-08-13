//* Assets
import MemoryGameImg from "@assets/memoryGame.webp"
import HangmanImg from "@assets/hangmanImg.webp"
import DragImg from "@assets/dragDropGame.webp"
import SentencesScrambleImg from "@assets/scrambler.webp"

export const games = [
	{
		imageSrc: MemoryGameImg,
		title: "Memory Game",
		text: "Test your memory with this fun game!",
		availableModes: ["singleMode", "1vs1"],
	},
	{
		imageSrc: HangmanImg,
		title: "Hangman",
		text: " Guess the word before the hangman is death!",
		availableModes: ["singleMode", "1vs1"],
	},
	{
		imageSrc: DragImg,
		title: "Drag & Drop",
		text: "A fun game to test your reflexes!",
		availableModes: ["singleMode", "1vs1"],
	},
	{
		imageSrc: SentencesScrambleImg,
		title: "Scrambler",
		text: "Unscramble the sentences to win!",
	},
]
