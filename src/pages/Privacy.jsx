import Layout from '../components/Layout.jsx'
import { brand, contact } from '../data/content.js'
import { OPEN_EVENT } from '../lib/consent.js'

export const UPDATED = '19 Ekim 2026'

// Başvuru kanalları: doldurulan iletişim bilgileri + her zaman Instagram
export function ReachUs() {
  return (
    <ul>
      {contact.email && <li>E-posta: <a href={`mailto:${contact.email}`}>{contact.email}</a></li>}
      {contact.address && <li>Posta: {contact.address}</li>}
      <li>Instagram: <a href={brand.instagram} target="_blank" rel="noreferrer">{brand.handle}</a></li>
    </ul>
  )
}

export default function Privacy() {
  const owner = contact.company || brand.name
  return (
    <Layout>
      <article className="legal">
        <p className="eyebrow">Yasal</p>
        <h1>Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
        <p className="legal-date">Son güncelleme: {UPDATED}</p>

        <p>
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, {brand.url.replace('https://', '')} web
          sitesini ziyaret ettiğinde ve iletişim formunu kullandığında kişisel verilerinin nasıl işlendiğini açıklar.
        </p>

        <h2>1. Veri sorumlusu</h2>
        <p>
          Kişisel verilerin, veri sorumlusu sıfatıyla <strong>{owner}</strong> tarafından işlenir
          {contact.address ? ` (adres: ${contact.address})` : ''}.
        </p>

        <h2>2. Hangi verileri işliyoruz?</h2>
        <ul>
          <li><strong>İletişim formu:</strong> adın soyadın, e-posta adresin, (yazarsan) telefon numaran, seçtiğin konu ve mesajın.</li>
          <li><strong>Anonim kullanım verisi:</strong> yalnızca izin verirsen; ziyaret edilen sayfa, yönlendiren site, ülke, cihaz ve tarayıcı türü. Seni kişi olarak tanımlayan bir bilgi içermez.</li>
          <li><strong>Teknik kayıtlar:</strong> sitenin barındırıldığı Vercel sunucularının güvenlik ve işletim amacıyla tuttuğu IP adresi ve istek kayıtları.</li>
          <li><strong>Tercih kaydı:</strong> çerez/analitik tercihin, tarayıcının yerel depolamasında (çerez olmadan) saklanır.</li>
        </ul>

        <h2>3. Hangi amaçla ve hangi hukuki sebeple?</h2>
        <ul>
          <li>Mesajına dönüş yapmak, teklif hazırlamak ve iş birliğini görüşmek: sözleşmenin kurulmasıyla doğrudan ilgili olması (KVKK m. 5/2-c) ve formdaki onayın.</li>
          <li>Sitenin güvenliğini sağlamak ve kötüye kullanımı önlemek: meşru menfaatimiz (KVKK m. 5/2-f).</li>
          <li>Sitenin nasıl kullanıldığını anlayıp iyileştirmek (analitik): açık rızan (KVKK m. 5/1). Rıza vermezsen analitik hiç çalışmaz.</li>
        </ul>

        <h2>4. Verilerin aktarılması</h2>
        <p>
          Hizmet aldığımız şu sağlayıcılar, verileri yalnızca bizim adımıza ve belirtilen amaçla işler. Sunucuları yurt dışında
          (ağırlıklı olarak ABD ve AB) bulunduğundan bu aktarım, KVKK m. 9 kapsamında açık rızana dayanır:
        </p>
        <ul>
          <li><strong>Web3Forms:</strong> iletişim formundaki mesajı e-posta adresimize iletir.</li>
          <li><strong>Vercel Inc.:</strong> sitenin barındırılması ve (izin verirsen) anonim ziyaret istatistikleri.</li>
          <li><strong>Google Fonts:</strong> yazı tiplerinin yüklenmesi; tarayıcın bu sırada Google sunucularına IP adresini iletir.</li>
        </ul>
        <p>Verilerin bunların dışında üçüncü kişilerle paylaşılmaz, satılmaz ve reklam amacıyla kullanılmaz.</p>

        <h2 id="cerezler">5. Çerezler ve analitik</h2>
        <p>
          Bu site çerez kullanmaz. Ziyaret istatistikleri için çerezsiz çalışan <strong>Vercel Analytics</strong> kullanılır ve
          yalnızca çerez bandında “Kabul et” dersen yüklenir. Tercihin tarayıcında saklanır; istediğin zaman değiştirebilirsin:
        </p>
        <p>
          <button type="button" className="link-arrow legal-btn" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
            Çerez tercihlerini aç
          </button>
        </p>

        <h2>6. Saklama süresi</h2>
        <p>
          Form mesajlarını, görüşme ve olası iş birliği süresince ve bitiminden sonra en fazla 2 yıl saklarız; iş birliği
          kurulursa yasal saklama süreleri uygulanır. Süre dolduğunda veriler silinir ya da anonim hale getirilir.
        </p>

        <h2>7. Hakların</h2>
        <p>KVKK m. 11 uyarınca; verilerinin işlenip işlenmediğini öğrenme, bilgi talep etme, işlenme amacını öğrenme, aktarıldığı kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, silinmesini ya da yok edilmesini isteme, bu işlemlerin aktarılan kişilere bildirilmesini isteme, otomatik analiz sonucu aleyhine bir sonuca itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğrarsan zararın giderilmesini talep etme hakların vardır.</p>

        <h2>8. Bize ulaş</h2>
        <p>Haklarınla ilgili taleplerini aşağıdaki kanallardan iletebilirsin; en geç 30 gün içinde ücretsiz olarak yanıtlarız.</p>
        <ReachUs />
      </article>
    </Layout>
  )
}
