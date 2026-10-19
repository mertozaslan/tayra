import Layout from '../components/Layout.jsx'

export default function NotFound() {
  return (
    <Layout>
      <section className="status-page">
        <p className="eyebrow">Hata 404</p>
        <h1 className="status-title">bu sayfa<br />iz bırakmadan<br />gitmiş.</h1>
        <p className="status-text">Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Ana sayfadan devam edebilirsin.</p>
        <div className="status-actions">
          <a href="/" className="pill">Ana sayfaya dön</a>
          <a href="/#isler" className="hero-link">İşleri gör <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </Layout>
  )
}
