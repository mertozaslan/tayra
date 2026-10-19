import wordmark from '../assets/brand/tayra-wordmark.svg'
import { brand } from '../data/content.js'

const services = ['Çekim', 'Kurgu', 'Drone', 'Marka kimliği', 'Sosyal medya']

// Ana ekran: arama motorlarının okuyabildiği gerçek metin. Logo h1'in içinde; alt metniyle birlikte "Tayra Interactive" okunur.
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />

      <h1 id="hero-title" className="hero-title">
        <span className="hero-kicker eyebrow">360° yaratıcı iletişim ajansı</span>
        <img
          src={wordmark}
          alt="Tayra"
          className="hero-mark"
          width="4665"
          height="1721"
          fetchPriority="high"
        />
        <span className="hero-label">interactive</span>
      </h1>

      <div className="hero-foot">
        <p className="hero-lede">
          Çekimden kurguya, marka kimliğinden sosyal medyaya; markanın hikâyesini uçtan uca anlatıyoruz.{' '}
          <strong>{brand.tagline}</strong>
        </p>
        <div className="hero-actions">
          <a href="#iletisim" className="pill">Projeni anlat</a>
          <a href="#isler" className="hero-link">İşleri gör <span aria-hidden="true">→</span></a>
        </div>
      </div>

      <ul className="hero-services" aria-label="Hizmetler">
        {services.map((s) => <li key={s}>{s}</li>)}
      </ul>

      <a href="#manifesto" className="hero-scroll" aria-label="Aşağı kaydır"><span /></a>
    </section>
  )
}
