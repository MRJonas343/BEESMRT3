// *Types
import { HangmanGameSingleStats } from "@types"

//* Components
import ProgressBar from "@ramonak/react-progress-bar"

//* Assets
import Throphy from "@assets/trophisIcon.png"

const HangmanGameStatsSingle: React.FC<HangmanGameSingleStats> = ({
	level,
	completedPercentage,
	englishLevel,
	trophys,
	Round,
}) => {
	return (
		<section className="rounded-md flex py-4 items-center">
			<div className="w-1/3 flex flex-col items-center justify-center text-xl font-Principal text-3d text-Yellow1 md:text-3xl">
				<p className="">{englishLevel}</p>
				<p className="">{level}</p>
			</div>
			<div className="w-1/3 flex flex-col justify-center items-center">
				<p className="font-Principal text-xl text-3d text-Yellow1 md:text-3xl">
					Round {Round} / 5
				</p>
				<ProgressBar
					completed={completedPercentage}
					className="w-full font-Secundaria drop-shadow-md text-3d md:text-3xl"
					animateOnRender={true}
					bgColor="#FC9503"
					height="30"
				/>
			</div>
			<div className="w-1/3 flex gap-3 justify-center items-center text-xl font-Principal text-3d text-Yellow1 md:text-3xl">
				<p className="font-Principal">{trophys}</p>
				<img src={Throphy} alt="Throphy" className="w-10 h-10 drop-shadow-md" />
			</div>
		</section>
	)
}

export default HangmanGameStatsSingle
