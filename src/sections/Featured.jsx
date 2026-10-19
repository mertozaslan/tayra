import { brand, works } from '../data/content.js'
import Img from '../components/Img.jsx'

// Az sayıda, büyük vaka kartı ve tek satırlık slogan (BUCK)
export default function Featured() {
  const featured = works.filter((w) => w.featured)
  return (
    <section className="featured section" aria-label="Öne çıkan işler">
      {featured.map((w, i) => (
        <a key={w.slug} href={brand.instagram} target="_blank" rel="noreferrer" className={`case${i % 2 ? ' is-alt' : ''}`}>
          <div className="case-media" data-reveal>
            <Img src={w.images[0]} alt={`${w.client} için Tayra Interactive'in hazırladığı ${w.title.toLocaleLowerCase('tr')}`} loading="lazy" width="1200" height="1500" />
          </div>
          <div className="case-copy" data-reveal>
            <p className="eyebrow">{w.client} · {w.year}</p>
            <h3>{w.tagline}</h3>
            <span className="case-more">{w.title} <span aria-hidden="true">→</span></span>
          </div>
        </a>
      ))}
    </section>
  )
}
