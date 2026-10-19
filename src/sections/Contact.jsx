import wordmark from '../assets/brand/tayra-wordmark.svg'
import { brand, intents } from '../data/content.js'

// Amaca göre ayrılmış iletişim blokları (Hello Monday) ve büyük kapanış
export default function Contact() {
  return (
    <footer id="iletisim" className="contact">
      <p className="eyebrow" data-reveal>İletişim</p>
      <h2 className="contact-title" data-reveal>bir iz<br />bırakalım.</h2>
      <ul className="intents">
        {intents.map((it) => (
          <li key={it.q} data-reveal>
            <a href={it.href} target="_blank" rel="noreferrer">
              <span className="intent-q">{it.q}</span>
              <span className="intent-a">{it.a} <span aria-hidden="true">↗</span></span>
            </a>
          </li>
        ))}
      </ul>
      <img src={wordmark} alt="" className="contact-mark" aria-hidden="true" />
      <div className="contact-foot">
        <span>© {new Date().getFullYear()} {brand.name}</span>
        <span>{brand.tagline} 🧿</span>
        <a href="#top">Başa dön ↑</a>
      </div>
    </footer>
  )
}
