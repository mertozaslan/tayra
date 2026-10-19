// Her sayfanın adresi ve arama motoru bilgileri. Build sırasında scripts/prerender.js bu listeden
// sayfa HTML'lerini ve sitemap.xml'i üretir; geliştirme sırasında main.jsx adresten sayfayı seçer.
export const pages = {
  home: {
    file: 'index.html',
    path: '/',
    title: 'Tayra Interactive | Yaratıcı İletişim Ajansı: Çekim, Kurgu, Kimlik',
    description: 'Tayra Interactive, 360° yaratıcı iletişim ajansı. Marka filmi çekimi, kurgu, drone, marka kimliği ve sosyal medya yönetimi. Premium iş, mahalle samimiyeti.',
    index: true,
    priority: '1.0',
  },
  privacy: {
    file: 'gizlilik-politikasi.html',
    path: '/gizlilik-politikasi',
    title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni | Tayra Interactive',
    description: 'Tayra Interactive web sitesinde hangi kişisel verilerin, hangi amaçla işlendiği; çerezler, analitik ve KVKK kapsamındaki hakların.',
    index: true,
    priority: '0.3',
  },
  terms: {
    file: 'kullanim-kosullari.html',
    path: '/kullanim-kosullari',
    title: 'Kullanım Koşulları | Tayra Interactive',
    description: 'Tayra Interactive web sitesinin kullanım koşulları: içerik ve fikri mülkiyet hakları, bağlantılar ve sorumluluk sınırları.',
    index: true,
    priority: '0.3',
  },
  thanks: {
    file: 'tesekkurler.html',
    path: '/tesekkurler',
    title: 'Teşekkürler, mesajın ulaştı | Tayra Interactive',
    description: 'Mesajın Tayra Interactive ekibine ulaştı. En kısa sürede dönüş yapacağız.',
    index: false,
  },
  notFound: {
    file: '404.html',
    path: '/404',
    title: 'Sayfa bulunamadı (404) | Tayra Interactive',
    description: 'Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Ana sayfadan devam edebilirsin.',
    index: false,
  },
}

export function pageFromPath(pathname) {
  const clean = pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/'
  if (clean === '/index') return 'home'
  return Object.keys(pages).find((k) => pages[k].path === clean) || 'notFound'
}
