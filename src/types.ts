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
  closeModal: () => void | null
}

export interface MemoryGameButttonProps {
  card: any
  flipped: boolean
  chooseCard: any
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

export interface ModalGameOverProps {
  showModal: boolean
  imageSrc: string
  message: string
  mainMessage: string
  playAgain: () => void
  showModalWin: () => void | null
}

export interface SpinningCoinProps {
  activePlayer: string
  showModalCoin: boolean
  headsOrTails: number | undefined
  changeCoin: () => void
}
