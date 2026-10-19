import part1 from '../assets/brand/logo-part-1.jpg'
import part2 from '../assets/brand/logo-part-2.jpg'
import ecoLogo from '../assets/work/ecopotamia-logo.jpg'
import ecoTayra from '../assets/work/ecopotamia-tayra.jpg'
import ecoCover from '../assets/work/ecopotamia-cover.jpg'
import agLogo from '../assets/work/ankaragucu-logo.jpg'
import agTayra from '../assets/work/ankaragucu-tayra.jpg'
import agCover from '../assets/work/ankaragucu-cover.jpg'

export const brand = {
  name: 'Tayra Interactive',
  tagline: 'Premium iş, mahalle samimiyeti.',
  description: '360° yaratıcı iletişim ajansı.',
  handle: '@tayrainteractive',
  instagram: 'https://www.instagram.com/tayrainteractive/',
}

// Manifesto taslak; ajansın kendi cümleleriyle değiştirilecek. Yıldızlı kelimeler yeşil vurgulanır.
const manifestoText =
  'her işte bir *iz* bırakırız. markanın hikâyesini kameranın arkasından, kurgu masasından ve sokağın içinden anlatırız. *premium* iş, *mahalle* samimiyeti.'
export const manifesto = manifestoText.split(' ').map((w) => {
  const m = w.match(/^\*(.+?)\*(.*)$/)
  return m ? { text: m[1] + m[2], accent: true } : { text: w, accent: false }
})

// Showreel videosu gelince `video` alanına eklenir; o zamana kadar görsel gösterilir.
export const reel = { poster: ecoTayra, video: null }

export const works = [
  {
    slug: 'ankaragucu',
    client: 'Ankara Gücü',
    title: 'Antrenman Filmi',
    tagline: 'Karlı sahada, sabahın ilk ışığında bir takım.',
    year: '2026',
    roles: ['Çekim', 'Kurgu'],
    cover: agTayra,
    images: [agLogo, agCover, agTayra],
    isNew: true,
    featured: true,
  },
  {
    slug: 'ecopotamia',
    client: 'Ecopotamia',
    title: 'Tanıtım Filmi',
    tagline: 'Bir çiftliği havadan, toprağın ritmiyle anlattık.',
    year: '2026',
    roles: ['Drone', 'Çekim', 'Kurgu'],
    cover: ecoLogo,
    images: [ecoLogo, ecoCover, ecoTayra],
    isNew: true,
    featured: true,
  },
  {
    slug: 'tayra',
    client: 'tayra',
    title: 'Yeni Kimlik',
    tagline: 'Kendi izimizi de kendimiz çizdik.',
    year: '2026',
    roles: ['Logo', 'Tipografi'],
    cover: part2,
    images: [part1, part2],
  },
]

// Hizmet açıklamaları taslak.
export const services = [
  { title: 'Çekim & Prodüksiyon', text: 'Tanıtım, antrenman ve marka filmleri. Drone, sahne ve sokak çekimleri; ekip, ekipman ve set yönetimi.', tags: ['Marka filmi', 'Spor', 'Drone'] },
  { title: 'Kurgu & Post', text: 'Ritmi hikâyeye göre kuran kurgu, renk düzenleme, ses ve sosyal medya kesimleri.', tags: ['Kurgu', 'Renk', 'Reels'] },
  { title: 'Marka Kimliği', text: 'Logo, renk, tipografi ve bunları her yüzeyde aynı sesle konuşturan kimlik sistemleri.', tags: ['Logo', 'Tipografi', 'Kılavuz'] },
  { title: 'Sosyal Medya', text: 'İçerik planı, çekim günleri, tasarım ve yayın takibi. Takipçiyle mahalle samimiyetinde konuşan hesaplar.', tags: ['Strateji', 'İçerik', 'Yönetim'] },
]

export const marquee = ['Çekim', 'Kurgu', 'Kimlik', 'Sosyal Medya', 'Drone', 'Marka Filmi']

// E-posta / telefon gelince bağlantılar güncellenecek; şimdilik hepsi Instagram'a gidiyor.
export const intents = [
  { q: 'Proje mi var?', a: 'Anlat, dinleyelim', href: brand.instagram },
  { q: 'Selam mı vereceksin?', a: 'Çay bizden', href: brand.instagram },
  { q: 'Ekibe mi katılacaksın?', a: 'Portfolyonu gönder', href: brand.instagram },
]
