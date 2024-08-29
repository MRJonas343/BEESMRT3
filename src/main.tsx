import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import { axiosInterceptor } from "./interceptors/axios.interceptor"
import { beesmartApi } from "./api/beesmrt.api"

axiosInterceptor(beesmartApi)

const root = createRoot(document.getElementById("root")!)

root.render(<App />)
