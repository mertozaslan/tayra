import { useEffect } from 'react'
import Header from './sections/Header.jsx'
import Hero from './sections/Hero.jsx'
import Manifesto from './sections/Manifesto.jsx'
import Reel from './sections/Reel.jsx'
import Work from './sections/Work.jsx'
import Services from './sections/Services.jsx'
import Marquee from './sections/Marquee.jsx'
import Featured from './sections/Featured.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  useEffect(() => {
    // data-reveal taşıyan öğeler ekrana girince bir kez belirir
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.setAttribute('data-in', '') // className değil: React yeniden çizince sınıf listesini ezer
        io.unobserve(e.target)
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Manifesto />
        <Reel />
        <Work />
        <Services />
        <Marquee />
        <Featured />
      </main>
      <Contact />
    </>
  )
}
