// Build sonrası: her sayfayı sunucuda çizip kendi HTML dosyasına yazar, başlık/açıklama/canonical'ı doldurur,
// sitemap.xml üretir. Böylece arama motorları içeriği JavaScript çalıştırmadan görür.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const { render, pages, brand } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const urlOf = (p) => brand.url + (p.path === '/' ? '/' : p.path)

function swap(html, re, value, key) {
  const found = typeof re === 'string' ? html.includes(re) : re.test(html)
  if (!found) throw new Error(`Şablonda bulunamadı: ${key}`)
  return html.replace(re, typeof re === 'string' ? () => value : value) // çizilen HTML'deki "$" işaretleri bozulmasın
}

for (const [key, p] of Object.entries(pages)) {
  let html = template
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`, 'title')
  html = swap(html, /(<meta name="description" content=")[^"]*/, `$1${esc(p.description)}`, 'description')
  html = swap(html, /(<meta property="og:title" content=")[^"]*/, `$1${esc(p.title)}`, 'og:title')
  html = swap(html, /(<meta property="og:description" content=")[^"]*/, `$1${esc(p.description)}`, 'og:description')
  html = swap(html, /(<meta name="robots" content=")[^"]*/, `$1${p.index ? 'index, follow, max-image-preview:large' : 'noindex, follow'}`, 'robots')
  if (p.index) {
    html = swap(html, /(<link rel="canonical" href=")[^"]*/, `$1${urlOf(p)}`, 'canonical')
    html = swap(html, /(<meta property="og:url" content=")[^"]*/, `$1${urlOf(p)}`, 'og:url')
  } else {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/\s*<meta property="og:url"[^>]*>/, '')
  }
  html = swap(html, /<body data-page="[^"]*">/, `<body data-page="${key}">`, 'body')
  html = swap(html, '<div id="root"></div>', `<div id="root">${render(key)}</div>`, 'root')
  fs.writeFileSync(path.join(dist, p.file), html)
  console.log(`  ${p.file.padEnd(28)} ${p.index ? 'index' : 'noindex'}`)
}

const today = new Date().toISOString().slice(0, 10)
const urls = Object.values(pages).filter((p) => p.index).map((p) =>
  `  <url>\n    <loc>${urlOf(p)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`)
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
console.log('  sitemap.xml')

fs.rmSync(ssrDir, { recursive: true, force: true })
