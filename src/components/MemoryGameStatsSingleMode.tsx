// *Types
import { MemoryGameStatsPropsSingle } from "@types"

//* Components
import ProgressBar from "@ramonak/react-progress-bar"

//* Assets
import Throphy from "@assets/trophisIcon.png"

const MemoryGameStatsSingleMode: React.FC<MemoryGameStatsPropsSingle> = ({
	level,
	completedPercentage,
	englishLevel,
	progressBarColor,
}) => {
	return (
		<section className="bg-white/70 rounded-md flex py-4 items-center">
			<div className="w-1/3 flex flex-col items-center justify-center">
				<p className="font-Secundaria text-lg">{englishLevel}</p>
				<p className="font-Secundaria text-lg">{level}</p>
			</div>
			<div className="w-1/3 flex justify-center">
				<ProgressBar
					completed={completedPercentage}
					className="w-full font-Secundaria"
					animateOnRender={true}
					bgColor={progressBarColor}
					height="30"
				/>
			</div>
			<div className="w-1/3 flex gap-3 justify-center items-center">
				<p className="font-Secundaria">100</p>
				<img src={Throphy} alt="Throphy" className="w-10 h-10" />
			</div>
		</section>
	)
}

export default MemoryGameStatsSingleMode
