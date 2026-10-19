import { useEffect } from 'react'
import { pages } from './pages/meta.js'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Thanks from './pages/Thanks.jsx'
import NotFound from './pages/NotFound.jsx'

const views = { home: Home, privacy: Privacy, terms: Terms, thanks: Thanks, notFound: NotFound }

export default function App({ page }) {
  useEffect(() => {
    // Build'de başlık HTML'e yazılır; geliştirme sunucusunda tek şablon olduğu için burada güncellenir
    document.title = pages[page].title

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
  }, [page])

  const View = views[page] || NotFound
  return <View />
}
