import { FC } from "react"
import { GameCardProps } from "../models/GameCardProps"

/**
 * Represents a home card component.
 * @param imageSrc - The source of the image.
 * @param title - The title of the card.
 * @param text - The text content of the card.
 */

const GameCard: FC<GameCardProps> = ({ imageSrc, text, title }) => {
	return (
		<div
			onClick={() => {}}
			className="bg-white/70 w-[43vw] h-[40vh] flex flex-col items-center overflow-auto p-5 rounded-2xl ease-in-out duration-200 hover:scale-105 hover:bg-yellow-400 cursor-pointer md:h-[37vh] lg:w-[22vw] lg:h-[55vh] lg:pt-20 shadow-2xl"
		>
			<img src={imageSrc} alt={title} className="w-28" />
			<h2 className="py-3 text-xl tracking-wide text-center text-white font-Principal text-3d md:text-2xl">
				{title}
			</h2>
			<p className="text-base text-center font-Secundaria lg:text-lg xl:text-xl">
				{text}
			</p>
		</div>
	)
}
export default GameCard
