import { useEffect, useState } from 'react'
import wordmark from '../assets/brand/tayra-wordmark.svg'
import { brand } from '../data/content.js'

const links = [
  { href: '#isler', label: 'İşler' },
  { href: '#hizmetler', label: 'Hizmetler' },
  { href: '#iletisim', label: 'İletişim' },
]

export default function Header({ base = '', solid = false }) {
  const [past, setPast] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Ana ekrandaki büyük logo görünürken üstteki küçük logo gizli; diğer sayfalarda hep görünür
    const onScroll = () => setPast(solid || window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`site-header${past ? ' is-past' : ''}${open ? ' is-open' : ''}`}>
        <a href={base || '#top'} className="site-logo" aria-label={`${brand.name} ana sayfa`}>
          <img src={wordmark} alt="" />
        </a>
        <nav className="site-nav" aria-label="Ana menü">
          {links.map((l) => <a key={l.href} href={base + l.href}>{l.label}</a>)}
        </nav>
        <a href={`${base}#iletisim`} className="pill">Projeni anlat</a>
        <button
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setOpen(!open)}
        >
          <i /><i />
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {links.map((l) => <a key={l.href} href={base + l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        </nav>
        <a href={brand.instagram} target="_blank" rel="noreferrer" className="mobile-menu-foot">{brand.handle}</a>
      </div>
    </>
  )
}
