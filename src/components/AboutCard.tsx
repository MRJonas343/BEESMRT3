import { AboutCardProps } from "@types"

const AboutCard: React.FC<AboutCardProps> = ({ image, title, text }) => {
	return (
		<div className="flex flex-col md:flex-row md:items-center">
			<div className="flex flex-col items-center pr-10 basis-[25%]">
				<img src={image} alt={title} />
			</div>
			<div className="flex flex-col w-full">
				<span className="font-Principal tracking-wide font-normal text-2xl py-2 text-center lg:text-left">
					{title}
				</span>
				<p className="font-Secundaria basis-[75%] lg:text-xl lg:pb-5">{text}</p>
			</div>
		</div>
	)
}

export default AboutCard
