import { useRef, useState } from 'react'
import { brand, intents } from '../data/content.js'
import { track } from '../lib/consent.js'

// Web3Forms erişim anahtarı ortam değişkeninden gelir (.env.local ve Vercel > Settings > Environment Variables)
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const empty = { name: '', email: '', phone: '', subject: intents[0].subject, message: '', consent: false, botcheck: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Adını yazar mısın?'
  if (!v.email.trim()) e.email = 'E-posta adresin gerekli; dönüşü buradan yapacağız.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Bu e-posta adresi geçerli görünmüyor.'
  if (v.phone.trim() && v.phone.replace(/\D/g, '').length < 10) e.phone = 'Telefon numarası eksik görünüyor.'
  if (v.message.trim().length < 10) e.message = 'Biraz daha detay verir misin? (en az 10 karakter)'
  if (!v.consent) e.consent = 'Devam etmek için aydınlatma metnini onaylaman gerekiyor.'
  return e
}

// Amaca göre ayrılmış iletişim (Hello Monday): konu seçilir, form doğrudan e-postaya düşer
export default function Contact() {
  const form = useRef(null)
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [failure, setFailure] = useState('')

  const set = (key) => (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    const next = { ...values, [key]: value }
    setValues(next)
    if (tried) setErrors(validate(next)) // ilk denemeden sonra hatalar yazdıkça güncellenir
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (status === 'sending') return
    setTried(true)
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      form.current.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    if (values.botcheck) return // bot tuzağı doluysa sessizce dur

    if (!ACCESS_KEY) {
      setStatus('error')
      setFailure('Form şu an yapılandırılmamış. Mesajını Instagram üzerinden iletebilirsin.')
      return
    }

    setStatus('sending')
    setFailure('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `tayrainteractive.com: ${values.subject} (${values.name.trim()})`,
          from_name: 'Tayra Interactive web sitesi',
          replyto: values.email.trim(),
          'Ad Soyad': values.name.trim(),
          'E-posta': values.email.trim(),
          Telefon: values.phone.trim() || '-',
          Konu: values.subject,
          Mesaj: values.message.trim(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`)
      track('Form gönderildi', { konu: values.subject })
      window.location.assign('/tesekkurler')
    } catch {
      setStatus('error')
      setFailure('Mesaj gönderilemedi. Bağlantını kontrol edip tekrar dener misin? Olmazsa Instagram’dan yaz.')
    }
  }

  const field = (key) => ({
    id: `f-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `f-${key}-err` : undefined,
  })
  const error = (key) => errors[key] && <p id={`f-${key}-err`} className="field-error">{errors[key]}</p>
  const intent = intents.find((it) => it.subject === values.subject) || intents[0]
  const errorCount = Object.keys(errors).length

  return (
    <section id="iletisim" className="contact" aria-labelledby="contact-title" data-hide-cta>
      <p className="eyebrow" data-reveal>İletişim</p>
      <h2 id="contact-title" className="contact-title" data-reveal>bir iz<br />bırakalım.</h2>

      <form ref={form} className="contact-form" noValidate onSubmit={onSubmit} aria-busy={status === 'sending'}>
        <fieldset className="intents">
          <legend className="sr-only">Konu</legend>
          {intents.map((it) => (
            <label key={it.subject} className={`intent${values.subject === it.subject ? ' is-on' : ''}`}>
              <input type="radio" name="subject" value={it.subject} checked={values.subject === it.subject} onChange={set('subject')} />
              <span className="intent-q">{it.q}</span>
              <span className="intent-a">{it.a}</span>
            </label>
          ))}
        </fieldset>

        <div className="fields">
          <div className="field">
            <label htmlFor="f-name">Ad Soyad *</label>
            <input type="text" autoComplete="name" {...field('name')} />
            {error('name')}
          </div>
          <div className="field">
            <label htmlFor="f-email">E-posta *</label>
            <input type="email" autoComplete="email" inputMode="email" {...field('email')} />
            {error('email')}
          </div>
          <div className="field">
            <label htmlFor="f-phone">Telefon <span>(isteğe bağlı)</span></label>
            <input type="tel" autoComplete="tel" inputMode="tel" {...field('phone')} />
            {error('phone')}
          </div>
          <div className="field field-wide">
            <label htmlFor="f-message">Mesajın *</label>
            <textarea rows="4" placeholder={`${intent.a}…`} {...field('message')} />
            {error('message')}
          </div>

          <input type="text" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" value={values.botcheck} onChange={set('botcheck')} />

          <div className="field field-wide field-check">
            <label>
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                onChange={set('consent')}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? 'f-consent-err' : undefined}
              />
              <span>
                <a href="/gizlilik-politikasi" target="_blank" rel="noreferrer">KVKK aydınlatma metnini</a> okudum;
                mesajıma dönüş yapılması için bilgilerimin işlenmesini kabul ediyorum. *
              </span>
            </label>
            {error('consent')}
          </div>
        </div>

        <div className="form-foot">
          <p className="form-status" role="status" aria-live="polite">
            {status === 'error' && failure && (
              <>{failure} <a href={brand.instagram} target="_blank" rel="noreferrer">{brand.handle} ↗</a></>
            )}
            {status !== 'error' && tried && errorCount > 0 && `Gönderemeden önce ${errorCount} alanı düzeltmen gerekiyor.`}
          </p>
          <button type="submit" className="submit" disabled={status === 'sending'}>
            {status === 'sending'
              ? <><span className="spinner" aria-hidden="true" /> Gönderiliyor…</>
              : <>Gönder <span aria-hidden="true">→</span></>}
          </button>
        </div>
      </form>
    </section>
  )
}
