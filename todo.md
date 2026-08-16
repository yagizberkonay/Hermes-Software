# Hermes Software — Görsel Revizyonu

## Kaydırma performansı optimizasyonu

- [ ] Lenis, GSAP ScrollTrigger, Framer Motion ve pointer parallax döngülerindeki frame darboğazlarını incele.
- [ ] Scroll sırasında layout/paint tetikleyen pahalı CSS ve DOM desenlerini azalt.
- [ ] Marquee, grid parallax ve reveal animasyonlarını GPU-dostu ve düşük maliyetli hale getir.
- [ ] Görünürlük tabanlı animasyonları ve reduced-motion davranışını yeniden doğrula.
- [ ] Masaüstü ve mobil production build ile screenshot/performance kontrolünü tamamla.
- [ ] Optimize edilmiş sürüm için yeni checkpoint oluştur.


## Sınırsız akış ve senior terminal revizyonu

- [x] Client signals akışını görünür sıçrama olmadan sürekli dönen marquee yapısına çevir.
- [x] Terminal paneline TypeScript, Rust, JavaScript, Python, Next.js, Tailwind CSS, Tauri, Node.js, React durum satırlarını ekle.
- [x] Terminalin görsel hiyerarşisini daha kıdemli bir sistem kontrol yüzeyine yükselt.
- [x] Masaüstü/mobil görünüm ve production build doğrulamasını tamamla.
- [x] Yeni checkpoint oluştur ve kullanıcıya ilet.

## Son Blueprint detay revizyonu

- [x] Archive kartlarını eşit katalog ritminden çıkarıp farklı plaka ölçeklerine ayır.
- [x] Client signals bölümüne origin/route/destination ölçüm satırını ekle.
- [x] Signal Yellow kullanımını durum, yön ve seçili etkileşimlerle sınırla.
- [x] Yeni masaüstü ve mobil screenshot doğrulamasını tamamla.

## Sadeleştirme, arşiv ve sinyal akışı revizyonu

- [x] Hero ve arşivdeki gereksiz dekoratif teknik şekilleri tespit et.
- [x] Hero ve arşiv yüzeylerini daha sade Blueprint düzenine indir.
- [x] NEXO ile NYX depolarının teknoloji bilgilerini doğrula ve proje modüllerini ekle.
- [x] Proje gridini altı kartlık dengeli arşiv düzenine getir.
- [x] Client signals bölümündeki kayıt miktarını azaltıp akış hızını yükselt.
- [x] Masaüstü/mobil görünüm ve production build doğrulamasını tamamla.
- [x] Yeni checkpoint oluştur ve kullanıcıya ilet.

## Hareket sistemi revizyonu

- [x] Mevcut Framer Motion, scroll ve reduced-motion davranışını denetle.
- [x] GSAP ile ScrollTrigger bağımlılığını ve animasyon kayıtlarını ekle.
- [x] Yumuşak kaydırma ile Lerp/Damping tabanlı fare-parallax katmanını uygula.
- [x] Blueprint bölümlerine scroll odaklı giriş, çizim ve pin koreografileri ekle.
- [x] Masaüstü/mobil performansını, klavye erişimini ve reduced-motion tercihini doğrula.
- [x] Yeni checkpoint oluştur ve kullanıcıya ilet.

## Görselsiz Blueprint ve çok dilli geri bildirim revizyonu

- [x] Hero, proje ve iletişim alanlarındaki tüm görsel varlık kullanımlarını tespit et.
- [x] Görsel bileşenlerini CSS/HTML tabanlı teknik çizim ve geometrik yüzeylerle değiştir.
- [x] Her desteklenen arayüz dili için özgün geri bildirim çevirilerini ekle.
- [x] Asenkron yorum akışının hareket sürelerini ölçülü biçimde azalt.
- [x] Masaüstü ve mobil görünüm ile production build doğrulamasını tamamla.
- [x] Yeni checkpoint oluştur ve kullanıcıya ilet.

## Geri bildirim ve hareket revizyonu

- [x] Kullanıcının sağladığı 20 geri bildirimi üç dengeli kolona dağıt.
- [x] Blueprint archive altına asenkron akan geri bildirim şeridini ekle.
- [x] Scroll ilerlemesine bağlı teknik çizim, başlık ve bölüm vurgularını ekle.
- [x] Reduced-motion tercihi için hareketleri güvenli biçimde sadeleştir.
- [x] Masaüstü ve mobil akışta görünüm ile üretim derlemesini doğrula.
- [x] Yeni checkpoint oluştur ve kullanıcıya ilet.

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
- Yeni checkpoint: cf92953c başarılı
