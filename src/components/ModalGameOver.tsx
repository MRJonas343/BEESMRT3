interface ModalGameOverProps {
	showModal: boolean
	imageSrc: string
	message: string
	mainMessage: string
	playAgain: () => void
	showModalWin: () => void
}

const ModalGameOver: React.FC<ModalGameOverProps> = ({
	showModal,
	imageSrc,
	message,
	mainMessage,
	playAgain,
	showModalWin,
}) => {
	let modalContainer: string

	if (showModal) {
		modalContainer =
			"fixed top-0 left-0 w-screen h-screen bg-gray-400/60 flex justify-center items-center"
	} else {
		modalContainer =
			"fixed top-0 left-0 w-screen h-screen bg-gray-400/60 flex justify-center items-center hidden"
	}

	return (
		<div className={modalContainer}>
			<div className="bg-white w-[350px] rounded-xl p-7 h-auto absolute z-30 top-1/2 left-1/2 fixPosition lg:w-1/3">
				<h1 className="text-5xl text-center weigh font-extrabold font-Principal pb-5 text-3d text-yellow-400 spacing tracking-wider">
					{mainMessage}
				</h1>
				<hr />
				<p className="pt-3 text-5xl text-center font-Principal text-Pink1 tracking-wider">
					{message}
				</p>
				<img className="flex w-72 mx-auto pt-5" src={imageSrc} alt="Message" />
				<div className="flex justify-between pt-4">
					<button
						type="button"
						onClick={playAgain}
						className="bg-blue-700 text-white py-3 px-5 rounded-lg font-Principal text-xl"
					>
						Play Again
					</button>

					<button
						type="button"
						onClick={showModalWin}
						className="bg-red-600 text-white py-3 px-10 rounded-lg font-Principal text-xl"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}

export default ModalGameOver
