// *Types
import { DragDrop1vs1StatsProps } from "@types"

//* Assets
import RedBee from "@assets/redbee.jpeg"
import BlueBee from "@assets/bluebee.jpeg"

const DragDrop1vs1Stats: React.FC<DragDrop1vs1StatsProps> = ({
	activePlayer,
	player1Points,
	player2Points,
}) => {
	const baseClassName = "w-14 h-14 rounded-full"
	const activePlayerClassName = `${baseClassName} drop-shadow-lg outline outline-Pink1 outline-4`
	const inactivePlayerClassName = `${baseClassName}`

	const player1ClassName =
		activePlayer === "player1" ? activePlayerClassName : inactivePlayerClassName

	const player2ClassName =
		activePlayer === "player2" ? activePlayerClassName : inactivePlayerClassName

	return (
		<>
			<div className="pt-4 pb-1 flex justify-between flex-row w-full">
				<div className="flex w-4/6 justify-center gap-6 px-8 items-center">
					<div>
						<img src={RedBee} alt="Red Bee" className={player1ClassName} />
					</div>
					<p className="text-2xl font-Principal text-Yellow1 text-3d">VS</p>
					<div>
						<img src={BlueBee} alt="Red Bee" className={player2ClassName} />
					</div>
				</div>

				<div className="w-2/6 flex flex-col mr-6">
					<p className="text-lg font-Principal text-red-400 text-3d">
						Player 1 points : {player1Points}
					</p>
					<p className="text-lg font-Principal text-blue-400 text-3d">
						Player 2 points : {player2Points}
					</p>
				</div>
			</div>
		</>
	)
}

export default DragDrop1vs1Stats
