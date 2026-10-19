import Layout from '../components/Layout.jsx'
import { brand, contact } from '../data/content.js'
import { UPDATED, ReachUs } from './Privacy.jsx'

export default function Terms() {
  const owner = contact.company || brand.name
  return (
    <Layout>
      <article className="legal">
        <p className="eyebrow">Yasal</p>
        <h1>Kullanım Koşulları</h1>
        <p className="legal-date">Son güncelleme: {UPDATED}</p>

        <p>
          {brand.url.replace('https://', '')} web sitesi (“Site”) {owner} tarafından işletilir. Siteyi kullanarak aşağıdaki
          koşulları kabul etmiş sayılırsın.
        </p>

        <h2>1. Sitenin amacı</h2>
        <p>
          Site, {brand.name}’ın hizmetlerini ve işlerini tanıtmak ve iletişim kurmak için hazırlanmıştır. Sitedeki bilgiler genel
          bilgilendirme amaçlıdır; teklif ya da sözleşme niteliği taşımaz. Hizmet koşulları her proje için ayrıca yazılı olarak belirlenir.
        </p>

        <h2>2. Fikri mülkiyet</h2>
        <p>
          Sitedeki logo, tasarım, metin, fotoğraf ve videolar {owner}’a veya ilgili müşterilerine aittir ve fikir ve sanat
          eserleri mevzuatıyla korunur. Yazılı izin olmadan kopyalanamaz, çoğaltılamaz, değiştirilemez ya da ticari amaçla
          kullanılamaz. Müşteri markaları ve logoları, yalnızca yapılan işi tanıtmak amacıyla gösterilir.
        </p>

        <h2>3. Kullanıcının yükümlülükleri</h2>
        <p>
          Siteyi hukuka uygun biçimde kullanmayı; iletişim formuna gerçeğe aykırı, başkasına ait, yanıltıcı ya da zararlı içerik
          göndermemeyi ve sitenin işleyişini bozacak girişimlerde bulunmamayı kabul edersin.
        </p>

        <h2>4. Bağlantılar</h2>
        <p>
          Site, Instagram gibi üçüncü taraf sitelere bağlantılar içerebilir. Bu sitelerin içeriğinden ve gizlilik
          uygulamalarından {brand.name} sorumlu değildir.
        </p>

        <h2>5. Sorumluluğun sınırı</h2>
        <p>
          Sitenin kesintisiz ve hatasız çalışması için özen gösteririz ancak bunu garanti etmeyiz. Siteye erişilememesinden ya da
          sitedeki bilgilerin kullanılmasından doğabilecek dolaylı zararlardan, yasaların izin verdiği ölçüde sorumlu değiliz.
        </p>

        <h2>6. Kişisel veriler</h2>
        <p>
          Kişisel verilerin nasıl işlendiğini <a href="/gizlilik-politikasi">Gizlilik Politikası ve KVKK Aydınlatma Metni</a>’nde
          bulabilirsin.
        </p>

        <h2>7. Değişiklikler ve uygulanacak hukuk</h2>
        <p>
          Bu koşulları zaman zaman güncelleyebiliriz; güncel metin her zaman bu sayfada yayımlanır. Koşullar Türkiye Cumhuriyeti
          kanunlarına tabidir.
        </p>

        <h2>8. İletişim</h2>
        <ReachUs />
      </article>
    </Layout>
  )
}
