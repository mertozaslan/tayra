import Layout from '../components/Layout.jsx'
import Img from '../components/Img.jsx'
import { works } from '../data/content.js'
import { workPath } from './meta.js'

// Tüm işler: her iş kapağıyla bir kart, kart detay sayfasına gider
export default function Works() {
  return (
    <Layout>
      <section className="works-page">
        <div className="section-head">
          <div>
            <p className="eyebrow">İşler</p>
            <h1 className="page-title">iz bıraktığımız<br />işler.</h1>
          </div>
          <span className="count">({String(works.length).padStart(2, '0')})</span>
        </div>
        <ul className="works-grid">
          {works.map((w) => (
            <li key={w.slug} data-reveal>
              <a href={workPath(w)} className="work-card">
                <div className="work-card-media">
                  <Img src={w.cover} alt={`${w.client}, ${w.title}: ${w.roles.join(', ')} çalışmasından kare`} loading="lazy" width="1200" height="1500" />
                </div>
                <p className="work-card-meta"><span>{w.roles.join(' · ')}</span><span>{w.year}</span></p>
                <h2 className="work-card-name">
                  {w.client}<span className="work-title">, {w.title}</span>
                  {w.isNew && <em className="tag-new">Yeni</em>}
                </h2>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
