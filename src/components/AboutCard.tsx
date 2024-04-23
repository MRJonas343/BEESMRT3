import { AboutCardProps } from "@types"

const AboutCard: React.FC<AboutCardProps> = ({ image, title, text }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <div className="flex flex-col items-center lg:mr-24 basis-[25%]">
        <img className="w-28 pt-6" src={image} alt={title} />
        <span className="font-Principal tracking-wide font-bold text-2xl py-4">{title}</span>
      </div>
      <p className="font-Secundaria basis-[75%] lg:text-xl">{text}</p>
    </div>
  )
}

export default AboutCard