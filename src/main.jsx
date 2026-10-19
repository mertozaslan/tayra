import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'
import { pageFromPath } from './pages/meta.js'

// Build'de her sayfa önceden çizilir (scripts/prerender.js) ve body'de data-page taşır; geliştirmede adresten bulunur
const root = document.getElementById('root')
const pre = root.hasChildNodes()
const page = pre ? document.body.dataset.page : pageFromPath(location.pathname)
const app = <StrictMode><App page={page} /></StrictMode>

if (pre) hydrateRoot(root, app)
else createRoot(root).render(app)
