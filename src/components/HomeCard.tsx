import { HomeCardProps } from "@types"

/**
 * Represents a home card component.
 * @param imageSrc - The source of the image.
 * @param title - The title of the card.
 * @param text - The text content of the card.
 */

const HomeCard: React.FC<HomeCardProps> = ({ imageSrc, title, text }) => {
	return (
		<div className="bg-white/70 w-[43vw] h-[40vh] flex flex-col items-center overflow-auto p-5 rounded-2xl ease-in-out duration-200 hover:scale-105 hover:bg-yellow-400 cursor-pointer md:h-[37dvh] lg:w-[22dvw] lg:h-[55dvh] lg:pt-20 shadow-2xl">
			<img src={imageSrc} alt={title} className="w-28" />
			<h2 className="font-Principal text-xl py-3 text-center text-3d text-white md:text-2xl tracking-wide">
				{title}
			</h2>
			<p className="text-center text-base font-Secundaria lg:text-lg xl:text-xl">
				{text}
			</p>
		</div>
	)
}

export default HomeCard
