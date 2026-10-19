import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { pages } from './pages/meta.js'
export { brand } from './data/content.js'

export function render(page) {
  return renderToString(<StrictMode><App page={page} /></StrictMode>)
}
