import toast from "react-hot-toast"

export const displayToastError = (message: string) => {
	toast.error(message, {
		position: "bottom-left",
		duration: 4000,
		className: "font-Secundaria",
	})
}
