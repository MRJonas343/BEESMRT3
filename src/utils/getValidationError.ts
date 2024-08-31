import { TypeWithKey } from "@/models/typeWithKey"

export const getValidationError = (errorCode: string) => {
	const codeMatcher: TypeWithKey<string> = {
		ERR_NETWORK:
			"Ups! Something went wrong with the network. Please try again later.",
		ERR_NOT_FOUND: "Ups! The resource you are looking for was not found.",
		ERR_BAD_REQUEST: "Ups! The request was not valid.",
		ERR_BAD_RESPONSE: "Ups! The beehive is not working properly.",
		ERR_EMAIL_ALREADY_EXISTS: "Ups! The email is already in use.",
		ERR_INVALID_CREDENTIALS: "Tryng to play with the credentials, huh?",
		ERR_INVALID_USER_EMAIL: "Ups! The email is not valid.",
		ERR_INVALID_USER_PASSWORD: "Ups! The password is not valid.",
		ERR_INVALID_USER_NICKNAME: "Ups! The nickname is not valid.",
		ERR_INVALID_ENGLISH_LEVEL: "Ups! The English level is not valid.",
		ERR_SERVER_ERROR: "Ups! The beehive is not working properly.",
		ERR_USER_NOT_FOUND: "Ups! The user was not found.",
		ERR_TOKEN_EXPIRED: "Ups! The session has expired.",
	}

	return (
		codeMatcher[errorCode] ||
		"Ups! Something went wrong. Please try again later."
	)
}
