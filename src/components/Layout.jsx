import Header from '../sections/Header.jsx'
import SiteFooter from './SiteFooter.jsx'
import CookieBanner from './CookieBanner.jsx'
import MobileCta from './MobileCta.jsx'

// Ana sayfa dışındaki sayfalarda bağlantılar ana sayfanın bölümlerine "/#..." ile gider
export default function Layout({ home = false, children }) {
  const base = home ? '' : '/'
  return (
    <>
      <Header base={base} solid={!home} />
      <main id="top">{children}</main>
      <SiteFooter />
      <MobileCta href={`${base}#iletisim`} />
      <CookieBanner />
    </>
  )
}
