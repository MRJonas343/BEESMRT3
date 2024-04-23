import { HomeCardProps } from "@types"

const HomeCard: React.FC<HomeCardProps> = ({ imageSrc, title, text }) => {
  return (
    <div className="bg-white/70 w-[43dvw] flex flex-col items-center overflow-hidden p-5 rounded-2xl ease-in-out duration-200 hover:scale-105 hover:bg-yellow-400 cursor-pointer md:h-[37dvh] lg:w-[22dvw] lg:h-[50dvh]">
      <img src={imageSrc} alt={title} className="w-28 xl:w-40" />
      <h2 className="font-Principal text-xl py-3 text-center text-3d text-white md:text-2xl xl:text-3xl tracking-wide">{title}</h2>
      <p className="text-center text-base text-clip overflow-y-auto font-Secundaria lg:text-lg xl:text-xl">{text}</p>
    </div>
  )
}

export default HomeCard