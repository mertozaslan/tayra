import { useEffect, useState } from 'react'
import { getConsent, setConsent, startAnalytics, OPEN_EVENT } from '../lib/consent.js'

// Çerez / analitik tercihi. Seçim yapılana kadar analitik yüklenmez; alt bilgideki "Çerez tercihleri" yeniden açar.
export default function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = getConsent()
    if (saved === 'granted') startAnalytics()
    if (!saved) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  useEffect(() => {
    document.body.toggleAttribute('data-banner', open)
  }, [open])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div className="cookie" role="dialog" aria-live="polite" aria-label="Çerez tercihleri">
      <p>
        Siteyi nasıl kullandığını <strong>anonim</strong> olarak ölçmek için Vercel Analytics kullanıyoruz.
        Çerez bırakmaz, seni tanımlamaz. İzin verir misin?{' '}
        <a href="/gizlilik-politikasi#cerezler">Detaylar</a>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-deny" onClick={() => choose('denied')}>Reddet</button>
        <button type="button" className="pill" onClick={() => choose('granted')}>Kabul et</button>
      </div>
    </div>
  )
}
