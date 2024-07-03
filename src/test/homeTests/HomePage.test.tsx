import { render, screen } from "@testing-library/react"
import HomeCard from "@components/HomeCard"
import HomePage from "@routes/home/HomePage"
import { MemoryRouter } from "react-router-dom"

describe("HomeCard", () => {
	const mockProps = {
		imageSrc: "test-image.jpg",
		title: "Test Title",
		text: "Test Text",
	}

	beforeEach(() => {
		render(<HomeCard {...mockProps} />)
	})

	it("renders the component with correct props", () => {
		const imageElement = screen.getByAltText(mockProps.title)
		const titleElement = screen.getByText(mockProps.title)
		const textElement = screen.getByText(mockProps.text)

		expect(imageElement).toBeDefined()
		expect(titleElement).toBeDefined()
		expect(textElement).toBeDefined()
	})
})

describe("HomePage Component", () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<HomePage />
			</MemoryRouter>,
		)
	})

	it("should render everythig", () => {
		expect(screen.getByRole("navigation")).toBeDefined()
		expect(
			screen.getByRole("heading", { name: /beesmrt games/i }),
		).toBeDefined()
		expect(screen.getByRole("link", { name: /memory game/i })).toBeDefined()
		expect(screen.getByRole("link", { name: /hangman/i })).toBeDefined()
		expect(screen.getByRole("link", { name: /drag and drop/i })).toBeDefined()
		expect(screen.getByAltText("")).toBeDefined()
	})
})
