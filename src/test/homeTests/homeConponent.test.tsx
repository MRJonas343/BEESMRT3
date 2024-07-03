import { render, screen } from "@testing-library/react"
import HomeCard from "@components/HomeCard"

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
