//*Assets
import cara from "@assets/contento.png"
import cruz from "@assets/cruz-roja.png"

//* Types
import { SpinningCoinProps } from "@types"

const SpinningCoin: React.FC<SpinningCoinProps> = ({
	showModalCoin,
	headsOrTails,
	changeCoin,
	activePlayer,
}) => {
	//*Estilos para modal
	let modalContainer: string

	if (showModalCoin) {
		modalContainer =
			"fixed top-0 left-0 w-screen h-screen bg-gray-400/60 flex justify-center items-center"
	} else {
		modalContainer =
			"fixed top-0 left-0 w-screen h-screen bg-gray-400/60 flex justify-center items-center hidden"
	}

	//*Estilos para la moneda container
	let coinContainer = "relative w-40"

	//*Estilos originales de las caras de la moneda
	let faceClassName = "face front absolute w-full h-full overflow-hidden"
	let backClassName = "face back"

	//* Estilos para la animacion
	if (headsOrTails === 0) {
		faceClassName = "absolute w-full h-full routation2 "
		backClassName = "routation"
		coinContainer = "relative w-40 pointer-events-none"
	} else if (headsOrTails === 1) {
		faceClassName = "absolute w-full h-full routation"
		backClassName = "routation2"
		coinContainer = "relative w-40 pointer-events-none"
	} else {
		faceClassName = "face front absolute w-full h-full overflow-hidden"
		backClassName = "face back"
		coinContainer = "relative w-40"
	}

	return (
		<div className={modalContainer}>
			<div className="bg-white w-[350px] h-[70%] rounded-xl p-7 absolute z-30 top-1/2 left-1/2 fixPosition lg:w-1/3">
				<div className="flex flex-col items-center mt-5">
					<h1 className="text-5xl text-center weigh font-extrabold font-Principal pb-5 text-3d text-Yellow1 spacing tracking-wider">
						{" "}
						Who will start?
					</h1>
					<h1 className="text-3xl text-center weigh font-extrabold font-Principal pb-5 text-3d text-Pink1 spacing tracking-wider">
						Click the Coin
					</h1>
					<div onClick={changeCoin} className={coinContainer}>
						<div className={faceClassName}>
							<img
								alt="cara"
								src={cara}
								className="absolute w-full h-full object-cover"
							/>
						</div>
						<div className={backClassName}>
							<img
								alt="cruz"
								src={cruz}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
					<h1 className="text-5xl mt-10 text-center weigh font-extrabold font-Principal pb-5 text-3d text-Yellow1 spacing tracking-wider">
						{activePlayer}
					</h1>
				</div>
			</div>
		</div>
	)
}

export default SpinningCoin
