import { useEffect, useRef, useState } from 'react'
import { brand, works } from '../data/content.js'

// Büyük yazılı iş listesi, "Müşteri, İş" düzeni (Somesuch); masaüstünde imleci takip eden önizleme
export default function Work() {
  const preview = useRef(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const onMove = (e) => { x = e.clientX; y = e.clientY }
    const tick = () => {
      cx += (x - cx) * 0.12
      cy += (y - cy) * 0.12
      if (preview.current) preview.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove) }
  }, [])

  return (
    <section id="isler" className="work section">
      <div className="section-head">
        <p className="eyebrow" data-reveal>Seçili işler</p>
        <span className="count" data-reveal>({String(works.length).padStart(2, '0')})</span>
      </div>
      <ul className="work-list" onPointerLeave={() => setActive(-1)}>
        {works.map((w, i) => (
          <li key={w.slug} data-reveal>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="work-row" onPointerEnter={() => setActive(i)}>
              <span className="work-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-name">
                {w.client}<span className="work-title">, {w.title}</span>
                {w.isNew && <em className="tag-new">Yeni</em>}
              </span>
              <span className="work-roles">{w.roles.join(' · ')}</span>
              <span className="work-year">{w.year}</span>
              <img className="work-thumb" src={w.cover} alt="" loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
      <div ref={preview} className={`work-preview${active >= 0 ? ' is-on' : ''}`} aria-hidden="true">
        {works.map((w, i) => (
          <img key={w.slug} src={w.cover} alt="" className={i === active ? 'is-active' : ''} />
        ))}
      </div>
      <a href={brand.instagram} target="_blank" rel="noreferrer" className="link-arrow" data-reveal>
        Tüm işler <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}
