import { useLang } from "@/lib/i18n";
import LegalLayout from "./LegalLayout";

export default function PrivacyPolicy() {
  const { lang, t } = useLang();
  
  if (lang === "tr") {
    return (
      <LegalLayout title={t.legal?.privacyPolicy || "Gizlilik Politikası"} lastUpdated="Eylül 2026">
        <h2 className="font-bold text-xl mt-8">1. Veri Sorumlusu</h2>
        <p>
          Bu Gizlilik Politikası, Türkiye'de kayıtlı <strong>Hermes Software</strong> (Veri Sorumlusu) tarafından işletilen hizmetler için geçerlidir.
          <br/>
          Adres: Profesör Doktor, Yavuz Plaza, Üngüt, Prof. Dr. Necmettin Erbakan Blv No:150, 46050 Onikişubat/Kahramanmaraş, Türkiye
          <br/>
          İletişim: privacy@hermessoftware.space
        </p>

        <h2 className="font-bold text-xl mt-8">2. Hangi Verileri Topluyoruz?</h2>
        <p>Mevcut uygulamamız dahilinde yalnızca aşağıdaki verileri toplamaktayız:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>İletişim Verileri:</strong> İletişim formu aracılığıyla gönderdiğiniz ad, e-posta adresi, proje türü ve mesajınız.</li>
          <li><strong>Sistem Verileri:</strong> Hizmetlerimizin çalışması için zorunlu olan IP adresi gibi temel teknik bilgiler.</li>
          <li><strong>Kullanıcı Hesapları / Ödeme:</strong> Şu anda web sitemiz üzerinde herkese açık bir kullanıcı hesabı sistemi veya doğrudan ödeme (Stripe vb.) entegrasyonu bulunmamaktadır. {t.documents?.requiresConfirmation}</li>
          <li><strong>Yapay Zeka (AI):</strong> İleride devreye alınacak AI özellikleri kapsamında verileriniz işlenebilir, ancak mevcut durumda bu entegrasyonlar aktif değildir. {t.documents?.requiresConfirmation}</li>
        </ul>

        <h2 className="font-bold text-xl mt-8">3. Verileri Neden İşliyoruz?</h2>
        <p>Topladığımız bilgileri şu amaçlarla işliyoruz:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Proje taleplerinize yanıt vermek ve iletişim kurmak.</li>
          <li>Web sitemizin güvenliğini ve işleyişini sağlamak.</li>
          <li>Pazarlama onayınız (eğer alındıysa) doğrultusunda bilgilendirme yapmak.</li>
        </ul>

        <h2 className="font-bold text-xl mt-8">4. Üçüncü Taraflar ve Uluslararası Aktarımlar</h2>
        <p>
          Mevcut altyapımız Cloudflare, Hostinger ve dahili e-posta altyapısı (Resend) üzerine kuruludur.
          Verileriniz, operasyonel zorunluluklar doğrultusunda ABD merkezli bağlı şirketimiz <strong>Hermes Software LLC</strong> ile paylaşılabilir.
          <br/>
          <strong>Uluslararası Aktarım Mekanizması:</strong> {t.documents?.requiresConfirmation} (KVKK aktarım şartları).
        </p>

        <h2 className="font-bold text-xl mt-8">5. Çerezler (Cookies) ve İzleme</h2>
        <p>
          Şu anda isteğe bağlı reklam (Meta Pixel, Google Ads) veya genel analiz çerezleri kullanılmamaktadır. Yalnızca sistem güvenliği için gerekli teknik veriler işlenebilir. İzleme teknolojileri eklendiğinde onayınıza sunulacaktır.
        </p>

        <h2 className="font-bold text-xl mt-8">6. Veri Saklama ve Güvenlik</h2>
        <p>
          Verileriniz, yasal yükümlülükler ve işleme amacı gerektirdiği sürece saklanır. Özellikle iletişim formu kayıtları 14 gün veya proje sonuçlanana kadar saklanabilir. İleride devreye girecek AI verilerinin saklanma süresi maksimum 14 gün olarak planlanmıştır. {t.documents?.requiresConfirmation}
        </p>

        <h2 className="font-bold text-xl mt-8">7. Haklarınız</h2>
        <p>
          Kişisel verilerinize erişme, düzeltme, silme veya işlemeyi kısıtlama hakkına sahipsiniz. Bu talepleriniz için alt kısımdaki "Gizlilik Talebi" formunu kullanabilir veya privacy@hermessoftware.space adresine ulaşabilirsiniz.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={t.legal?.privacyPolicy || "Privacy Policy"} lastUpdated="September 2026">
      <h2 className="font-bold text-xl mt-8">1. Data Controller</h2>
      <p>
        This Privacy Policy applies to the services operated by <strong>Hermes Software</strong> (the Data Controller), registered in Türkiye.
        <br/>
        Address: Profesör Doktor, Yavuz Plaza, Üngüt, Prof. Dr. Necmettin Erbakan Blv No:150, 46050 Onikişubat/Kahramanmaraş, Türkiye
        <br/>
        Contact: privacy@hermessoftware.space
      </p>

      <h2 className="font-bold text-xl mt-8">2. What Data We Collect</h2>
      <p>Based on our current implementation, we collect the following data:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Contact Information:</strong> Name, email address, project type, and message provided via our contact form.</li>
        <li><strong>System Data:</strong> Basic technical information (such as IP addresses) necessary for the secure operation of our services.</li>
        <li><strong>User Accounts / Payments:</strong> There is currently no public user account system (e.g. Auth0) or direct payment gateway (e.g. Stripe) implemented on our website. {t.documents?.requiresConfirmation}</li>
        <li><strong>AI Processing:</strong> Future AI features (e.g., Anthropic/Claude) may process data, but no such integrations are currently active. {t.documents?.requiresConfirmation}</li>
      </ul>

      <h2 className="font-bold text-xl mt-8">3. Purposes of Processing</h2>
      <p>We process your information to:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Respond to your project inquiries and communicate with you.</li>
        <li>Ensure the security and operational integrity of our website.</li>
        <li>Send marketing communications if explicit consent was provided.</li>
      </ul>

      <h2 className="font-bold text-xl mt-8">4. Third-Party Providers and International Transfers</h2>
      <p>
        Our infrastructure relies on Cloudflare, Hostinger, and an internal email system (Resend).
        Your data may be transferred to our US-affiliated entity, <strong>Hermes Software LLC</strong>, strictly for operational continuity.
        <br/>
        <strong>Transfer Mechanism:</strong> {t.documents?.requiresConfirmation} (Legal transfer safeguards under applicable law).
      </p>

      <h2 className="font-bold text-xl mt-8">5. Cookies and Tracking</h2>
      <p>
        We do not currently deploy general-purpose optional cookies, analytics, or advertising tracking scripts (such as Meta Pixel or Google Ads). If these are implemented in the future, we will ask for your consent.
      </p>

      <h2 className="font-bold text-xl mt-8">6. Data Retention and Security</h2>
      <p>
        We retain your data as long as necessary for the purpose it was collected. Contact inquiries are kept until resolved. Any future AI conversation data is planned to be retained for a maximum of 14 days. {t.documents?.requiresConfirmation}
      </p>

      <h2 className="font-bold text-xl mt-8">7. Your Rights (including California Rights)</h2>
      <p>
        You have the right to access, correct, delete, or restrict the processing of your data. If you are a California resident, you may have additional rights under the CCPA, including the right to know and delete. We do not sell your personal data. 
        Please submit your requests via the "Privacy Request" form below or email privacy@hermessoftware.space. {t.documents?.requiresConfirmation}
      </p>
    </LegalLayout>
  );
}
