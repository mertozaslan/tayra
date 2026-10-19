import { useState } from 'react'
import { services } from '../data/content.js'

// Numaralı, açılır hizmet listesi (Monks)
export default function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section id="hizmetler" className="services section">
      <div className="section-head">
        <p className="eyebrow" data-reveal>Ne yapıyoruz</p>
        <h2 className="services-title" data-reveal>kameradan kimliğe,<br /><span className="accent">360°</span> iletişim.</h2>
      </div>
      <ul className="svc-list">
        {services.map((s, i) => (
          <li key={s.title} className={`svc${open === i ? ' is-open' : ''}`} data-reveal>
            <button className="svc-head" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="svc-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="svc-name">{s.title}</span>
              <span className="svc-plus" aria-hidden="true" />
            </button>
            <div className="svc-body">
              <div>
                <p>{s.text}</p>
                <ul className="tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
