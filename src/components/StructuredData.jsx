import { brand, contact, services } from '../data/content.js'

// Google için Organization + WebSite verisi; yalnızca doldurulmuş iletişim alanları eklenir
export default function StructuredData() {
  const org = {
    '@type': 'Organization',
    '@id': `${brand.url}/#organization`,
    name: brand.name,
    legalName: contact.company || undefined,
    url: `${brand.url}/`,
    logo: `${brand.url}/icon-512.png`,
    image: `${brand.url}/og-image.jpg`,
    slogan: brand.tagline,
    description: '360° yaratıcı iletişim ajansı: marka filmi çekimi, kurgu, drone, marka kimliği ve sosyal medya yönetimi.',
    email: contact.email || undefined,
    telephone: contact.phone || undefined,
    address: contact.address ? { '@type': 'PostalAddress', streetAddress: contact.address, addressCountry: 'TR' } : undefined,
    knowsAbout: services.map((s) => s.title),
    sameAs: [brand.instagram],
  }
  const site = {
    '@type': 'WebSite',
    '@id': `${brand.url}/#website`,
    url: `${brand.url}/`,
    name: brand.name,
    inLanguage: 'tr-TR',
    publisher: { '@id': org['@id'] },
  }
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': [org, site] }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
