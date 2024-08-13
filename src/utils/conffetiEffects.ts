import confetti from "canvas-confetti"

const normalShoot = () => {
	const count = 500
	const defaults = {
		origin: { y: 0.7 },
	}

	const fire = (particleRatio: number, opts: { spread: number }) => {
		confetti(
			Object.assign({}, defaults, opts, {
				particleCount: Math.floor(count * particleRatio),
			}),
		)
	}

	fire(0.25, {
		spread: 26,
	})
	fire(0.2, {
		spread: 60,
	})
	fire(0.35, {
		spread: 100,
	})
	fire(0.1, {
		spread: 120,
	})
	fire(0.1, {
		spread: 120,
	})
}

const fireWorks = () => {
	const duration = 8 * 1000
	const animationEnd = Date.now() + duration
	const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 0 }

	const randomInRange = (min: number, max: number) =>
		Math.random() * (max - min) + min

	const interval = setInterval(() => {
		const timeLeft = animationEnd - Date.now()

		if (timeLeft <= 0) {
			return clearInterval(interval)
		}

		const particleCount = 100 * (timeLeft / duration)

		confetti({
			...defaults,
			particleCount,
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
		})
		confetti({
			...defaults,
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
		})
	}, 250)
}

const stars = () => {
	const defaults = {
		spread: 1000,
		ticks: 50,
		gravity: 0,
		decay: 0.94,
		startVelocity: 30,
		colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
		zIndex: 0,
	}

	const shoot = () => {
		confetti({
			...defaults,
			particleCount: 40,
			scalar: 1.2,
			shapes: ["star"],
		})

		confetti({
			...defaults,
			particleCount: 10,
			scalar: 0.75,
			shapes: ["star"],
		})

		confetti({
			...defaults,
			particleCount: 10,
			scalar: 0.75,
			shapes: ["star"],
		})
	}
	setTimeout(shoot, 0)
	setTimeout(shoot, 100)
	setTimeout(shoot, 200)
	setTimeout(shoot, 300)
}

const crazyRapidFire = () => {
	const end = Date.now() + 15 * 1000
	const colors = ["#bb0000", "#ffffff"]

	function frame() {
		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: colors,
		})

		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: colors,
		})

		if (Date.now() < end) {
			requestAnimationFrame(frame)
		}
	}

	frame()
}

const shootBees = () => {
	const scalar = 2
	const bee = confetti.shapeFromText({ text: "🐝", scalar })

	const defaults = {
		spread: 360,
		ticks: 60,
		gravity: 0,
		decay: 0.96,
		startVelocity: 20,
		shapes: [bee],
		scalar: 3,
	}

	function shoot() {
		confetti({
			...defaults,
			particleCount: 30,
		})

		confetti({
			...defaults,
			particleCount: 5,
		})

		confetti({
			...defaults,
			particleCount: 15,
		})
	}

	setTimeout(shoot, 0)
	setTimeout(shoot, 100)
	setTimeout(shoot, 200)
	setTimeout(shoot, 300)
}

export { normalShoot, fireWorks, stars, crazyRapidFire, shootBees }
