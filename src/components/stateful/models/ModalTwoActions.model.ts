export interface ModalTwoActionsProps {
	mainMessage: string
	message: string
	imageSrc: string
	shouldShowModal: boolean
	mainActionPlaceholder: string
	secondaryActionPlaceholder: string
	mainAction: () => void
	secondaryAction: () => void
}
