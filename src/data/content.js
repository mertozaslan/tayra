import part1 from '../assets/brand/logo-part-1.webp'
import part2 from '../assets/brand/logo-part-2.webp'
import ecoLogo from '../assets/work/ecopotamia-logo.webp'
import ecoTayra from '../assets/work/ecopotamia-tayra.webp'
import ecoCover from '../assets/work/ecopotamia-cover.webp'
import agLogo from '../assets/work/ankaragucu-logo.webp'
import agTayra from '../assets/work/ankaragucu-tayra.webp'
import agCover from '../assets/work/ankaragucu-cover.webp'
import velCover from '../assets/work/veloura-cover.webp'
import velTayra from '../assets/work/veloura-tayra.webp'
import velLogo from '../assets/work/veloura-logo.webp'
import wlCover from '../assets/work/waterland-cover.webp'
import wlTayra from '../assets/work/waterland-tayra.webp'
import wlSocial from '../assets/work/waterland-social.webp'

export const brand = {
  name: 'Tayra Interactive',
  tagline: 'Premium iş, mahalle samimiyeti.',
  description: '360° yaratıcı iletişim ajansı.',
  handle: '@tayrainteractive',
  instagram: 'https://www.instagram.com/tayrainteractive/',
  url: 'https://tayrainteractive.com',
}

// İletişim bilgileri: doldurulan alanlar sitede, yasal metinlerde ve Google'ın okuduğu yapılandırılmış veride görünür.
// Boş (null) bırakılanlar hiçbir yerde gösterilmez.
export const contact = {
  email: null, // örn. 'merhaba@tayrainteractive.com'
  phone: null, // örn. '+90 5xx xxx xx xx'
  address: null, // örn. 'Çankaya, Ankara'
  company: null, // yasal ünvan, örn. 'Tayra Interaktif Medya Ltd. Şti.'
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

// İş detay sayfaları (/isler/<slug>) bu listeden üretilir. `summary` paragrafları detay sayfasında görünür
// (Instagram açıklaması olmayanlar taslak); `instagram` varsa ilgili gönderiye, yoksa profile bağlanır.
export const works = [
  {
    slug: 'veloura',
    client: 'Veloura Atelier',
    title: 'Kurumsal Kimlik',
    tagline: 'Bir kutunun üzerinde, bir kartın köşesinde, aynı özen.',
    year: '2026',
    roles: ['Logo', 'Ambalaj', 'Kurumsal Kimlik'],
    cover: velCover,
    images: [velCover, velTayra, velLogo],
    summary: [
      'Bir kutunun üzerinde, bir kartın köşesinde, bir buketin etiketinde… Veloura Atelier için tasarladığımız kimlik, markanın zarafetini her detayda sürdürüyor.',
      'Logodan ambalaja, kartvizitten zarfa kadar her yüzeyde aynı sade ve incelikli dil.',
    ],
    instagram: 'https://www.instagram.com/p/DeweBGZtPTB/',
    isNew: true,
  },
  {
    slug: 'waterland',
    client: 'Waterland Car Wash',
    title: 'Sosyal Medya Yönetimi',
    tagline: 'Hizmetteki titizliği dijital iletişime taşıdık.',
    year: '2026',
    roles: ['Strateji', 'İçerik', 'Çekim', 'Kurgu'],
    cover: wlCover,
    images: [wlCover, wlTayra, wlSocial],
    summary: [
      'Waterland Car Wash’ın sosyal medya yönetimini; içerik planlamasından tasarıma, video çekiminden kurguya uzanan bütünlüklü bir yaklaşımla yürütüyoruz.',
      'Markanın uzmanlığını görünür kılan, kendine özgü dilini güçlendiren içerikler üretiyoruz.',
    ],
    instagram: 'https://www.instagram.com/p/DerJLVWNTXM/',
    isNew: true,
  },
  {
    slug: 'ankaragucu',
    client: 'Ankara Gücü',
    title: 'Antrenman Filmi',
    tagline: 'Karlı sahada, sabahın ilk ışığında bir takım.',
    year: '2026',
    roles: ['Çekim', 'Kurgu'],
    cover: agTayra,
    images: [agLogo, agCover, agTayra],
    summary: ['Karlı sahada, sabahın ilk ışığında Ankara Gücü’nün antrenmanını çektik ve kurguladık.'],
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
    summary: ['Ecopotamia çiftliğini havadan ve yerden çektik; toprağın ritmini kurguyla bir tanıtım filmine dönüştürdük.'],
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
    summary: ['Ajansın yeni logosunu ve tipografisini kendimiz tasarladık.'],
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

// İletişim formundaki konu seçenekleri
export const intents = [
  { q: 'Proje mi var?', a: 'Anlat, dinleyelim', subject: 'Yeni proje' },
  { q: 'Selam mı vereceksin?', a: 'Çay bizden', subject: 'Selam' },
  { q: 'Ekibe mi katılacaksın?', a: 'Portfolyonu gönder', subject: 'Ekibe katılım' },
]
