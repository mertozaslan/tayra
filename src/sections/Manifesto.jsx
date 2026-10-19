import { useEffect, useRef } from 'react'
import { manifesto } from '../data/content.js'

// Büyük beyan (Instrument / Locomotive): kaydırdıkça kelimeler sırayla aydınlanır, vurgulu kelimeler yeşil
export default function Manifesto() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const spans = [...el.querySelectorAll('.mf-word')]
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.25)))
      const lit = Math.round(p * spans.length)
      spans.forEach((s, i) => s.classList.toggle('is-lit', i < lit))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="manifesto" className="manifesto section">
      <p className="eyebrow" data-reveal>Biz kimiz</p>
      <p ref={ref} className="mf-text">
        {manifesto.map((w, i) => (
          <span key={i} className={`mf-word${w.accent ? ' is-accent' : ''}`}>{w.text} </span>
        ))}
      </p>
    </section>
  )
}
