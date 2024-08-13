import { TypeWithKey } from "@/models/typeWithKey"

// biome-ignore lint/suspicious/noExplicitAny: <Haven't find how to type it>
export const getValidationError = (errorCode: any) => {
	const codeMatcher: TypeWithKey<string> = {
		ERR_NETWORK:
			"Ups! Something went wrong with the network. Please try again later.",
		ERR_NOT_FOUND: "Ups! The resource you are looking for was not found.",
		ERR_BAD_REQUEST: "Ups! The request was not valid.",
		ERR_BAD_RESPONSE: "Ups! The beehive is not working properly.",
		ERR_EMAIL_ALREADY_EXISTS: "Ups! The email is already in use.",
	}

	return (
		codeMatcher[errorCode] ||
		"Ups! Something went wrong. Please try again later."
	)
}
