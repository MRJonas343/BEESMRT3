import { FC } from "react"
import { ModalTwoActionsProps } from "./models/ModalTwoActions.model"
import { createPortal } from "react-dom"
/**
 * A modal component with two action buttons.
 * The modal displays a message, an image, and two action buttons.
 * @param message - The message to display in the modal.
 * @param mainMessage - The main message to display in the modal.
 * @param imageSrc - The source of the image to display in the modal.
 * @param shouldShowModal - Determines whether the modal should be shown or hidden.
 * @param mainActionPlaceholder - The placeholder for the main action button.
 * @param secondaryActionPlaceholder - The placeholder for the secondary action button.
 * @param mainAction - The function to execute when the main action button is clicked.
 * @param secondaryAction - The function to execute when the secondary action button is clicked.
 */

const ModalTwoActions: FC<ModalTwoActionsProps> = ({
	message,
	mainMessage,
	imageSrc,
	shouldShowModal,
	mainActionPlaceholder,
	secondaryActionPlaceholder,
	mainAction,
	secondaryAction,
}) => {
	const portalRoot = document.getElementById("portal-root")!

	let modalClassName: string

	if (shouldShowModal) {
		modalClassName =
			"fixed top-0 left-0 w-screen h-screen flex bg-gray-400/60 flex justify-center items-center"
	} else {
		modalClassName = "hidden"
	}

	return createPortal(
		<div className={modalClassName}>
			<div className="bg-white animate-vertical-bounce animate-iteration-count-twice w-[350px] rounded-xl p-7 h-auto absolute z-30 lg:w-1/3">
				<h1 className="pb-5 text-5xl font-extrabold tracking-wider text-center text-yellow-400 weigh font-Principal text-3d spacing">
					{mainMessage}
				</h1>
				<hr />
				<p className="pt-3 text-5xl tracking-wider text-center text-3d font-Principal text-Pink1">
					{message}
				</p>
				<img className="flex pt-5 mx-auto w-72" src={imageSrc} alt="Message" />
				<div className="flex justify-around pt-4">
					<button
						type="button"
						onClick={secondaryAction}
						className="px-10 py-3 text-xl text-white bg-red-600 rounded-lg font-Principal"
					>
						{secondaryActionPlaceholder}
					</button>
					<button
						type="button"
						onClick={mainAction}
						className="px-10 py-3 text-xl text-white bg-blue-400 rounded-lg font-Principal"
					>
						{mainActionPlaceholder}
					</button>
				</div>
			</div>
		</div>,
		portalRoot,
	)
}

export default ModalTwoActions
