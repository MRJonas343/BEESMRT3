import ReactDOM from 'react-dom/client'
import App from './App'
import { SpeedInsights } from '@vercel/speed-insights/next'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <SpeedInsights />
  </>
)
