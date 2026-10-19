import wordmark from '../assets/brand/tayra-wordmark.svg'
import { brand, contact } from '../data/content.js'
import { OPEN_EVENT } from '../lib/consent.js'

// Tüm sayfalarda ortak alt bilgi: iletişim bilgileri, büyük logo ve yasal bağlantılar
export default function SiteFooter() {
  const details = [
    contact.email && { label: 'E-posta', value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { label: 'Telefon', value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, '')}` },
    contact.address && { label: 'Adres', value: contact.address },
    { label: 'Instagram', value: brand.handle, href: brand.instagram, external: true },
  ].filter(Boolean)

  return (
    <footer className="site-footer" data-hide-cta>
      <address className="footer-contact">
        {details.map((d) => (
          <div key={d.label}>
            <span className="footer-label">{d.label}</span>
            {d.href
              ? <a href={d.href} {...(d.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{d.value}</a>
              : <span>{d.value}</span>}
          </div>
        ))}
      </address>
      <img src={wordmark} alt="" className="contact-mark" aria-hidden="true" width="4665" height="1721" loading="lazy" />
      <div className="contact-foot">
        <span>© {new Date().getFullYear()} {contact.company || brand.name}</span>
        <nav className="footer-links" aria-label="Yasal">
          <a href="/gizlilik-politikasi">Gizlilik ve KVKK</a>
          <a href="/kullanim-kosullari">Kullanım koşulları</a>
          <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>Çerez tercihleri</button>
        </nav>
        <a href="#top">Başa dön ↑</a>
      </div>
    </footer>
  )
}
