import { useLang } from "@/lib/i18n";
import LegalLayout from "./LegalLayout";

export default function Kvkk() {
  const { lang, t } = useLang();
  
  return (
    <LegalLayout title={t.legal?.kvkk || "KVKK Aydınlatma Metni"} lastUpdated="Eylül 2026">
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla <strong>Hermes Software</strong> olarak, kişisel verilerinizin işlenmesi, korunması ve haklarınız konusunda sizi bilgilendirmek istiyoruz.
      </p>

      <h2 className="font-bold text-xl mt-8">1. Veri Sorumlusu</h2>
      <p>
        Unvan: Hermes Software<br/>
        Adres: Profesör Doktor, Yavuz Plaza, Üngüt, Prof. Dr. Necmettin Erbakan Blv No:150, 46050 Onikişubat/Kahramanmaraş, Türkiye<br/>
        E-posta: privacy@hermessoftware.space
      </p>

      <h2 className="font-bold text-xl mt-8">2. İşlenen Kişisel Verileriniz ve İşlenme Amaçları</h2>
      <p>
        Web sitemiz üzerinden iletişim formunu kullandığınızda; ad, e-posta, proje türü ve mesaj içerikleri gibi bilgileri toplamaktayız. Bu veriler:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Taleplerinizi değerlendirmek ve size dönüş yapabilmek,</li>
        <li>Hizmet sözleşmesi süreçlerinin yürütülmesi,</li>
        <li>Bilgi güvenliği süreçlerinin yürütülmesi (IP adresleri gibi sistem verileri)</li>
      </ul>
      <p className="mt-2">amaçlarıyla işlenmektedir.</p>

      <h2 className="font-bold text-xl mt-8">3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
      <p>
        Kişisel verileriniz, web sitemizdeki iletişim formu ve sistem logları aracılığıyla tamamen veya kısmen otomatik yollarla elde edilmektedir. Verileriniz, KVKK Madde 5/2 uyarınca "bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması" ve "veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması" hukuki sebeplerine dayanılarak işlenmektedir.
      </p>

      <h2 className="font-bold text-xl mt-8">4. Kişisel Verilerin Aktarılması</h2>
      <p>
        Verileriniz, operasyonel sürekliliği sağlamak amacıyla yurt dışındaki sunucu hizmeti sağlayıcılarına (Cloudflare, Hostinger vb.) ve grup şirketimiz Hermes Software LLC (ABD) şirketine aktarılabilir. 
        <br/><br/>
        <strong>Yurtdışına Aktarım Mekanizması:</strong> {t.documents?.requiresConfirmation} (Kurul izni, açık rıza veya yeterlilik kararı doğrultusunda onay bekliyor).
      </p>

      <h2 className="font-bold text-xl mt-8">5. İlgili Kişinin Hakları (KVKK Madde 11)</h2>
      <p>
        Kişisel veri sahibi olarak;
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
        <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
        <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>Verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
        <li>KVKK 7. maddede öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
        <li>Verilerinizin kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.</li>
      </ul>
      <p className="mt-4">
        Haklarınıza ilişkin taleplerinizi alt kısımdaki <strong>Gizlilik Talebi</strong> formu aracılığıyla veya <strong>privacy@hermessoftware.space</strong> adresine yazılı olarak iletebilirsiniz.
      </p>
    </LegalLayout>
  );
}
