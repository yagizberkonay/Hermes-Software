# Hermes Software — Görsel Revizyonu

## Hareket sistemi revizyonu

- [x] Mevcut Framer Motion, scroll ve reduced-motion davranışını denetle.
- [x] GSAP ile ScrollTrigger bağımlılığını ve animasyon kayıtlarını ekle.
- [x] Yumuşak kaydırma ile Lerp/Damping tabanlı fare-parallax katmanını uygula.
- [x] Blueprint bölümlerine scroll odaklı giriş, çizim ve pin koreografileri ekle.
- [x] Masaüstü/mobil performansını, klavye erişimini ve reduced-motion tercihini doğrula.
- [ ] Yeni checkpoint oluştur ve kullanıcıya ilet.

## Görselsiz Blueprint ve çok dilli geri bildirim revizyonu

- [x] Hero, proje ve iletişim alanlarındaki tüm görsel varlık kullanımlarını tespit et.
- [x] Görsel bileşenlerini CSS/HTML tabanlı teknik çizim ve geometrik yüzeylerle değiştir.
- [x] Her desteklenen arayüz dili için özgün geri bildirim çevirilerini ekle.
- [x] Asenkron yorum akışının hareket sürelerini ölçülü biçimde azalt.
- [x] Masaüstü ve mobil görünüm ile production build doğrulamasını tamamla.
- [ ] Yeni checkpoint oluştur ve kullanıcıya ilet.

## Geri bildirim ve hareket revizyonu

- [x] Kullanıcının sağladığı 20 geri bildirimi üç dengeli kolona dağıt.
- [x] Blueprint archive altına asenkron akan geri bildirim şeridini ekle.
- [x] Scroll ilerlemesine bağlı teknik çizim, başlık ve bölüm vurgularını ekle.
- [x] Reduced-motion tercihi için hareketleri güvenli biçimde sadeleştir.
- [x] Masaüstü ve mobil akışta görünüm ile üretim derlemesini doğrula.
- [ ] Yeni checkpoint oluştur ve kullanıcıya ilet.

- [x] Kullanıcı tarafından sağlanan ana illüstrasyon ve botanik varlıkların kullanım yerlerini tespit et.
- [x] Kullanıcı görsellerini JSX ve stil dosyalarından kaldır.
- [x] Görsel hücreleri yalnızca üretilen Hermes blueprint/schematic varlıklarıyla yeniden düzenle.
- [x] TypeScript kontrolü ve production build çalıştır.
- [x] Masaüstü ve mobil görünümü yeniden doğrula.
- [x] Yeni checkpoint oluştur ve kullanıcıya ilet.

## Kapsam kararı
Kullanıcı tarafından verilen ana illüstrasyon ile botanik görselleri kaldırıldı. Sonraki revizyonda hero, proje ve output dâhil tüm görsel dosyası referansları da temizlendi; yüzeyler yalnızca CSS/HTML tabanlı Blueprint geometrileriyle kuruluyor.

## Doğrulama
- Kullanıcı görsel kullanımı: kod taramasında eşleşme yok
- Üretim derlemesi: başarılı
- Masaüstü screenshot: başarılı
- Mobil screenshot: başarılı
- Yeni checkpoint: bekleniyor
