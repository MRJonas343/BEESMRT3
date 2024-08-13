import ModalTwoActions from "@/components/stateful/ModalTwoActions"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PublicRoutes } from "@/models/routes"

const ModalShouldLogin = () => {
	const [shouldShowModal, setShouldShowModal] = useState(true)
	const navigate = useNavigate()

	const goToLogin = () => {
		setShouldShowModal(false)
		navigate(PublicRoutes.LOGIN)
	}

	const closeModal = () => {
		setShouldShowModal(false)
	}

	return (
		<>
			<ModalTwoActions
				mainMessage="Error"
				message="You are not authenticated"
				imageSrc="https://media.giphy.com/media/3o7TKz50Rg5pGQ8gxi/giphy.gif"
				shouldShowModal={shouldShowModal}
				mainActionPlaceholder="Login"
				secondaryActionPlaceholder="Later"
				mainAction={goToLogin}
				secondaryAction={closeModal}
			/>
		</>
	)
}

export default ModalShouldLogin
