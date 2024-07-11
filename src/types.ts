export interface HomeCardProps {
	imageSrc: string
	title: string
	text: string
}

export interface AboutCardProps {
	image: string
	title: string
	text: string
}

export interface BasicModalProps {
	showModal: boolean
	imageSrc: string
	message: string
	mainMessage: string
	closeModal: () => void
}

export interface MemoryGameButttonProps {
	card: CardMemoryGameProps
	flipped: boolean
	chooseCard: (card: CardMemoryGameProps) => void
}

export interface MemoryGameStatsProps {
	isPlayer1Active: boolean
	player1Points: number
	player2Points: number
	playAgain: () => void
}

export interface MemoryGameModalProps {
	showModal: boolean
	Question: string
	imageSrc: string
	answer1: string
	answer2: string
	answer3: string
	answer4: string
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface CardMemoryGameProps {
	id: number
	src: string
	matched: boolean
	question: string
	correctAnswer: string
	incorrectAnswers: string[]
}

export interface KeyHangmanGameProps {
	element: string
}

export interface DraggableItemType {
	idDraggableItem: number
	draggableImgSrc: string | null
	shouldDissaperd: boolean
}

export interface DroppableProps {
	idDroppableItem: number
	imgDropped: string | null
	description: string | null
	hasAnItem: boolean
}

export interface ItemsDnDGameProps {
	id: number
	word: string
	image: string
}

export interface ModalGameOverProps {
	showModal: boolean
	imageSrc: string
	message: string
	mainMessage: string
	playAgain: () => void
	showModalWin: () => void
}

export interface SpinningCoinProps {
	activePlayer: string
	showModalCoin: boolean
	headsOrTails: number | undefined
	changeCoin: () => void
}

export interface contactMessage {
	nameUser: string
	email: string
	message: string
}

export interface registerUser {
	fullName: string
	nickName: string
	email: string
	password: string
}

export interface userDataLogin {
	email: string
	password: string
}

export interface MemoryGameStatsPropsSingle {
	englishLevel: string
	level: string
	completedPercentage: number
	trophys: number
	pairs: number
}

export interface EnglishLevel {
	EnglishLevel: string
	LevelName: string
	Level: string
	Trophys: number
}

export interface HangmanGameSingleStats {
	englishLevel: string
	level: string
	completedPercentage: number
	trophys: number
	Round: number
}

export interface HangmanWords {
	word: string
	hint: string
}

export interface ModalSingleModeProps {
	showModal: boolean
	imageSrc: string
	message: string
	mainMessage: string
	victoryOrDefeat: "Victory" | "Defeat" | "NotDefined"
	nextLevel: () => void
	tryAgain: () => void
	close: () => void
}

export interface HangmanGameStats1vs1Props {
	activePlayer: "" | "player1" | "player2"
	player1WonRounds: number
	player2WonRounds: number
	player1Mistakes: number
	player2Mistakes: number
}

export interface DragAndDropGameSingleStats {
	englishLevel: string
	level: string
	completedPercentage: number
	trophys: number
	round: number
}
export interface DragDrop1vs1StatsProps {
	activePlayer: string
	player1Points: number
	player2Points: number
}

export interface newUserData {
	fullName: string
	nickName: string
	englishLevel: string
	profileImage: File[]
}

export interface userDataUpdate {
	fullName: string
	nickName: string
	englishLevel: string
	profileImage: File[]
}

interface sanitizeUserData {
	fullName: string
	nickName: string
	englishLevel: string
	image: File
}

export type OptionalNewUserData = Partial<userDataUpdate>
export type OptionalSanitizeUserData = Partial<sanitizeUserData>
