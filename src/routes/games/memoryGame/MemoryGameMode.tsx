import { Link } from "react-router-dom"

//*Components
import NavBar from "@components/NavBar"

//*Assets
import VSImage from "@assets/competencia.webp"
import Single from "@assets/soltero.webp"
import Online from "@assets/tienda-online.webp"
import ComingSoon from "@assets/comingSoon.webp"

const MemoryGameMode: React.FC = () => {
	return (
		<main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
			<NavBar />
			<div className="mt-3 mb-3">
				<h1 className="font-Principal text-2xl text-center text-3d text-white tracking-wider lg:text-4xl">
					Select Mode
				</h1>
			</div>
			<section className="flex flex-col lg:flex-row lg:h-[80dvh] lg:w-[90dvw] lg:mx-auto gap-5 lg:gap-0 lg:justify-evenly items-center">
				<div className="w-[60dvw] hover:scale-105 ease-in-out duration-200 relative p-6 rounded-lg bg-white h-[25dvh] lg:w-[25dvw] lg:h-[50dvh]">
					<div className="centerAbsolute rounded-lg z-10 w-[60dvw] h-[25dvh] bg-yellow-400/90 lg:w-[25dvw] lg:h-[50dvh]">
						<div className="centerAbsolute">
							<img
								alt="comingSoon"
								src={ComingSoon}
								className="w-36 xl:w-full"
							/>
						</div>
					</div>

					<div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-full">
						<div className="overflow-hidden flex items-center justify-center">
							<img className="w-20 lg:w-28" src={Single} alt="" />
						</div>

						<div className="">
							<p className="font-Principal text-xl text-center text-black">
								Single Player
							</p>
							<div className="w-full flex justify-center mt-2">
								<button
									type="button"
									className="font-Principal text-white bg-Pink2 border-0 py-2 px-10 focus:outline-none hover:bg-Pink1 rounded text-xl shadow-lg flex-col lg:py-4 lg:px-10"
								>
									Play
								</button>
							</div>
						</div>
					</div>
				</div>

				<Link to="/games/memorygame1vs1">
					<div className="w-[60dvw] hover:scale-105 ease-in-out duration-200 p-6 rounded-lg bg-white h-[25dvh] lg:w-[25dvw] lg:h-[50dvh] lg:flex lg:flex-col lg:items-center lg:justify-center">
						<div className="overflow-hidden flex items-center justify-center">
							<img className="w-20 lg:w-28" src={VSImage} alt="" />
						</div>
						<div className="">
							<p className="font-Principal text-xl text-center text-black">
								1 vs 1
							</p>
							<div className="w-full flex justify-center mt-2">
								<button
									type="button"
									className="font-Principal text-white bg-Pink2 border-0 py-2 px-10 focus:outline-none hover:bg-Pink1 rounded text-xl shadow-lg flex-col lg:py-4 lg:px-10"
								>
									Play
								</button>
							</div>
						</div>
					</div>
				</Link>

				<div className="hover:scale-105 ease-in-out duration-200 w-[60dvw] relative p-6 rounded-lg bg-white h-[25dvh] lg:w-[25dvw] lg:h-[50dvh]">
					<div className="centerAbsolute rounded-lg z-10 w-[60dvw] h-[25dvh] bg-yellow-400/90 lg:w-[25dvw] lg:h-[50dvh]">
						<div className="centerAbsolute">
							<img
								alt="comingSoon"
								src={ComingSoon}
								className="w-36 xl:w-full"
							/>
						</div>
					</div>

					<div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-full">
						<div className="overflow-hidden flex items-center justify-center">
							<img className="w-20 lg:w-28" src={Online} alt="" />
						</div>

						<div className="">
							<p className="font-Principal text-xl text-center text-black">
								Online
							</p>
							<div className="w-full flex justify-center mt-2">
								<button
									type="button"
									className="font-Principal text-white bg-Pink2 border-0 py-2 px-10 focus:outline-none hover:bg-Pink1 rounded text-xl shadow-lg flex-col lg:py-4 lg:px-10"
								>
									Play
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default MemoryGameMode
