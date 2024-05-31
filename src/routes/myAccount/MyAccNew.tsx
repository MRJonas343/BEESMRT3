import NavBar from "@components/NavBar"

function MyAccNew() {
	return (
		<div className="bg-Gradient1 h-screen">
			<div className="bg-slate-900 py-5">
				<NavBar />
			</div>
			<div className="flex flex-wrap justify-around mt-16 gap-5">
				<div className="bg-white flex gap-5 p-8">
					<img src="/defaultProfile.svg" alt="imgProfDef" />
					<div className="grid">
						<h1 className="font-semibold">BeeYam</h1>
						<h2 className="">BeeName</h2>
						<h2>Grade: Special</h2>
						<div className="flex justify-center gap-3">
							<div>Skills 1</div>
							<div>Skills 2</div>
							<div>Skills 3</div>
						</div>
					</div>
				</div>
				<div className="bg-white flex gap-5 p-8 w-2/3">
					<h1 className="font-bold">Advancements</h1>
				</div>
			</div>
			<div className="bg-white flex gap-5 p-8 m-10">
				<h1>Hola</h1>
			</div>
		</div>
	)
}

export default MyAccNew
