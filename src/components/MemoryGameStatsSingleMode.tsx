// *Types
import { MemoryGameStatsPropsSingle } from "@types"
import ProgressBar from "@ramonak/react-progress-bar"

const MemoryGameStatsSingleMode: React.FC<MemoryGameStatsPropsSingle> = ({
	player1Points,
	playAgain,
	failPercentage,
}) => {
	return (
		<section className="flex justify-evenly xl:flex-col xl:h-[80vh]">
			<div className="bg-white/80 flex w-[500px] justify-between h-28 w-  font-Principal rounded-xl">
				<p className="">Points {player1Points}</p>
				<ProgressBar
					// height="40"
					completed={failPercentage}
					className="w-[250px]"
				/>
				<button
					type="button"
					className="text-base px-6 py-2 bg-red-600 rounded-md p-1 text-white"
					onClick={playAgain}
				>
					RESET
				</button>
			</div>
		</section>
	)
}

export default MemoryGameStatsSingleMode
