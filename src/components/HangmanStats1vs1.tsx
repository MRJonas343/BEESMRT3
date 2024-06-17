import { HangmanGameStats1vs1Props } from "@types"

const HangmanStats1vs1 = ({
	activePlayer,
	player1Mistakes,
	player1WonRounds,
	player2Mistakes,
	player2WonRounds,
}: HangmanGameStats1vs1Props) => {
	const baseClassName = "font-Principal text-xl text-3d md:text-3xl"
	const activePlayerClassName = `${baseClassName} text-Yellow1`
	const inactivePlayerClassName = `${baseClassName} text-white`

	const player1ClassName =
		activePlayer === "player1" ? activePlayerClassName : inactivePlayerClassName
	const player2ClassName =
		activePlayer === "player2" ? activePlayerClassName : inactivePlayerClassName

	return (
		<section className="p-5 flex justify-around text-center">
			<div className="pt-7">
				<p className={player1ClassName}>Player1</p>
				<p className={player2ClassName}>Player2</p>
			</div>
			<div className="">
				<p className="font-Principal text-xl text-3d text-[#08EC2C] md:text-3xl">
					Won Rounds
				</p>
				<p className="font-Principal text-xl text-3d text-white md:text-3xl">
					{player1WonRounds}/3
				</p>
				<p className="font-Principal text-xl text-3d text-white md:text-3xl">
					{player2WonRounds}/3
				</p>
			</div>
			<div>
				<p className="font-Principal text-xl text-3d text-[#ea4848] md:text-3xl">
					Mistakes
				</p>
				<p className="font-Principal text-xl text-3d text-white md:text-3xl">
					{player1Mistakes}/3
				</p>
				<p className="font-Principal text-xl text-3d text-white md:text-3xl">
					{player2Mistakes}/3
				</p>
			</div>
		</section>
	)
}
export default HangmanStats1vs1
