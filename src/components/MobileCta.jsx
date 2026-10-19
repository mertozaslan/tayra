import { useEffect, useState } from 'react'

// Mobilde ekranın altına sabitlenen "Projeni anlat" butonu: ana ekran geçilince belirir,
// iletişim formu ya da alt bilgi görünürken gizlenir (masaüstünde CSS ile hiç gösterilmez)
export default function MobileCta({ href }) {
  const [past, setPast] = useState(false)
  const [covered, setCovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const seen = new Set()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
      setCovered(seen.size > 0)
    })
    document.querySelectorAll('[data-hide-cta]').forEach((el) => io.observe(el))
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <a href={href} className={`mobile-cta${past && !covered ? ' is-on' : ''}`} tabIndex={past && !covered ? 0 : -1}>
      Projeni anlat <span aria-hidden="true">→</span>
    </a>
  )
}
