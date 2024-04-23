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