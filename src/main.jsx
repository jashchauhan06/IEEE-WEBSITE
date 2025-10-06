import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './Router.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
// import AppRouter from './RouterFallback.jsx' // Uncomment this if BrowserRouter doesn't work

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>,
)
