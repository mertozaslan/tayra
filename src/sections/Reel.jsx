import { useEffect, useRef, useState } from 'react'
import { reel } from '../data/content.js'
import Img from '../components/Img.jsx'

// Kaydırdıkça küçük çerçeveden tam ekrana açılan showreel bandı (W+K); video varsa tıklayınca tam ekran oynar (Dogstudio)
export default function Reel() {
  const wrap = useRef(null)
  const frame = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const r = wrap.current.getBoundingClientRect()
      const span = r.height - window.innerHeight
      const p = Math.min(1, Math.max(0, -r.top / (span || 1)))
      frame.current.style.setProperty('--p', p.toFixed(4))
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

  useEffect(() => {
    if (!playing) return
    const onKey = (e) => e.key === 'Escape' && setPlaying(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [playing])

  return (
    <section ref={wrap} className="reel" aria-label="Showreel">
      <div className="reel-sticky">
        <div ref={frame} className="reel-frame">
          {reel.video
            ? <video src={reel.video} poster={reel.poster} autoPlay muted loop playsInline />
            : <Img src={reel.poster} alt="Tayra Interactive showreel: Ecopotamia tanıtım filminden bir kare" loading="lazy" width="1200" height="1500" />}
          <button className="reel-btn" onClick={() => reel.video && setPlaying(true)} disabled={!reel.video}>
            <span className="reel-dot" aria-hidden="true" />
            {reel.video ? 'Reeli izle' : 'Showreel · yakında'}
          </button>
        </div>
      </div>
      {playing && (
        <div className="reel-overlay" role="dialog" aria-modal="true" aria-label="Showreel">
          <video src={reel.video} autoPlay controls playsInline />
          <button className="reel-close" onClick={() => setPlaying(false)}>Kapat</button>
        </div>
      )}
    </section>
  )
}
