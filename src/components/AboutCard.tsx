import { AboutCardProps } from "@types"

const AboutCard: React.FC<AboutCardProps> = ({ image, title, text }) => {
	return (
		<div className="flex flex-col lg:flex-row lg:items-center">
			<div className="flex flex-col items-center lg:mr-24 basis-[25%] lg:pb-5">
				<img className="w-28 pt-6" src={image} alt={title} />
			</div>
			<div className="flex flex-col w-full">
				<span className="font-Principal tracking-wide font-bold text-2xl py-6 text-center lg:text-left">
					{title}
				</span>
				<p className="font-Secundaria basis-[75%] lg:text-xl lg:pb-5">{text}</p>
			</div>
		</div>
	)
}

export default AboutCard
