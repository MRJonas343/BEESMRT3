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

export interface DraggableItemProps {
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
	description: string
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
