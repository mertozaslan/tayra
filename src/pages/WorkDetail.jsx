import Layout from '../components/Layout.jsx'
import Img from '../components/Img.jsx'
import NotFound from './NotFound.jsx'
import { brand, works } from '../data/content.js'
import { workPath } from './meta.js'

// Tek bir işin detayı: başlık ve künye, açıklama, görseller, sıradaki iş
export default function WorkDetail({ slug }) {
  const i = works.findIndex((w) => w.slug === slug)
  if (i < 0) return <NotFound />
  const w = works[i]
  const next = works[(i + 1) % works.length]

  return (
    <Layout>
      <article className="case-page">
        <header className="case-hero">
          <a href="/isler" className="hero-link case-back"><span aria-hidden="true">←</span> Tüm işler</a>
          <p className="eyebrow">{w.client} · {w.year}</p>
          <h1 className="page-title">{w.title}</h1>
          <p className="case-lede">{w.tagline}</p>
        </header>

        <dl className="case-facts" data-reveal>
          <div><dt>Müşteri</dt><dd>{w.client}</dd></div>
          <div><dt>Yıl</dt><dd>{w.year}</dd></div>
          <div><dt>Ne yaptık</dt><dd>{w.roles.join(', ')}</dd></div>
        </dl>

        <div className="case-body" data-reveal>
          {w.summary.map((t) => <p key={t}>{t}</p>)}
          <a href={w.instagram || brand.instagram} target="_blank" rel="noreferrer" className="link-arrow">
            Instagram’da gör <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="case-gallery">
          {w.images.map((src, n) => (
            <div key={src} className="case-shot" data-reveal>
              <Img src={src} alt={`${w.client}, ${w.title}: görsel ${n + 1}`} loading={n ? 'lazy' : 'eager'} width="1200" height="1500" />
            </div>
          ))}
        </div>

        <a href={workPath(next)} className="case-next">
          <span className="eyebrow">Sıradaki iş</span>
          <span className="case-next-name">{next.client}<span className="work-title">, {next.title}</span> <span aria-hidden="true">→</span></span>
        </a>
      </article>
    </Layout>
  )
}
