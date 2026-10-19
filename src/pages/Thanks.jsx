import Layout from '../components/Layout.jsx'
import { brand } from '../data/content.js'

export default function Thanks() {
  return (
    <Layout>
      <section className="status-page">
        <p className="eyebrow">Mesajın ulaştı</p>
        <h1 className="status-title">teşekkürler,<br /><span className="accent">çay demleniyor.</span></h1>
        <p className="status-text">
          Mesajın ekibimize ulaştı. En kısa sürede e-postayla dönüş yapacağız.
          O zamana kadar son işlerimize Instagram’dan göz atabilirsin.
        </p>
        <div className="status-actions">
          <a href="/" className="pill">Ana sayfaya dön</a>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="hero-link">{brand.handle} <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </Layout>
  )
}
