# Hermes Software Portföyü — Tasarım Beyin Fırtınası

## Üç Olası Yaklaşım

### 1. The Blueprint
**Very Brief Intro:** Kâğıt beyazı üzerinde siyah teknik çizim izleri, kalın sınırlar ve ölçülü endüstriyel sarı ile mimari bir sistem hissi veren neo-brutalist portföy. Fazla boşluk, içeriklerin acele etmeden okunmasını sağlar.

**Probability:** 0.07

### 2. Botanical Machinery
**Very Brief Intro:** Sağlanan el çizimi bitki varlıkları ile mekanik modülleri yan yana getirerek yazılım ile organik büyüme arasındaki dengeyi vurgular. Doku odaklı, daha anlatısal ve canlı bir yaklaşım olur.

**Probability:** 0.04

### 3. Archive Terminal
**Very Brief Intro:** Eski teknik dokümantasyon sayfaları ve terminal transkriptlerinden ilham alan, daha yoğun monospace ritme sahip editoryal bir arşiv görünümü. Bilgi hiyerarşisini öne çıkarır, illüstrasyonları ikincil tutar.

**Probability:** 0.09

## Seçilen Yön: The Blueprint

### Design Movement
Neo-brutalizm ile İsviçre teknik dokümantasyonu estetiğinin birleşimi. Yapı; ağır, dürüst ve yüksek kontrastlıdır, ancak kalın çerçeveler arasındaki geniş negatif alan sayesinde ferah kalır.

### Core Principles
1. **Çizim tahtası disiplini:** Her öğe görünür bir yapı içinde yer alır; border ve grid, dekor değil bilgi mimarisidir.
2. **Kasıtlı boşluk:** Hücreler içerikten önce nefes alır. Geniş padding ve boş alan, işin premium hissini taşır.
3. **Ham ama hassas:** Siyah çizgiler, sert ofset gölgeler ve kare yakın geometri kullanılır; küçük detayler ise tipografi ve hizalamada özenli kalır.
4. **Tek vurgu, net sinyal:** Endüstriyel sarı sadece etkileşim, aktif durum ve yön işaretleri için kullanılır.

### Color Philosophy
Ana zemin, dijital ekran yerine çalışma kâğıdını çağrıştıran sıcak açık bejdir. Tam siyah, yüksek okunurluk ve araç/mimari ciddiyeti yaratır. Endüstriyel sarı yalnızca hareket ya da karar anlarında görünür; bu sayede renk, süs değil aktif bir sinyaldir. Sağlanan illüstrasyonlardaki yeşil, kırmızı ve mavi yalnızca görsel varlıkta kalır; UI paletini ele geçirmez.

### Layout Paradigm
Sayfa merkezi bir kahraman alanına yığılmak yerine, geniş açıklıklı 12 kolonlu asimetrik bir **bento blueprint** olarak davranır. Üst bölüm isim, sistem durumu ve dil hücrelerini; orta bölüm proje modüllerini; alt bölüm ise büyük çıkış/iletişim bloklarını taşır. Masaüstünde hücreler sabit grid ritminde farklı kolon/satır aralıkları kaplar; mobilde aynı okuma sırası tek kolonda korunur.

### Signature Elements
1. Çerçeve köşelerinden taşan ince koordinat çizgileri ve ölçüm işaretleri.
2. Her önemli hücrede kalın `4px` siyah border ve `8px 8px 0` sert gölge.
3. Sağlanan el çizimi botanik illüstrasyonların yalnızca birkaç kenarda, grid sınırlarını kesen dekoratif sürgünler olarak kullanımı.

### Interaction Philosophy
Etkileşimler bir teknik arayüz gibi kararlı ve fiziksel olmalıdır. Kart üzerine gelmek ya da klavyeyle odaklanmak, kartın sarı sinyal durumuna geçmesini; teknoloji etiketlerinin ve büyük yön okunun ortaya çıkmasını sağlar. Hiçbir etkileşim sürpriz navigasyon ya da gereksiz görsel efekt yaratmaz.

### Animation
Sayfa yüklenirken hücreler, yukarıdan/kenardan uçmak yerine %95 ölçek ve düşük opaklıktan 180–240 ms içinde yerlerine yerleşir; gruplar arasında 45 ms gecikme olur. Sayaç mekanik aralıklarla yükselir ve `2564` değerinde net biçimde durur. Hover/focus tepkileri 160–220 ms aralığında sadece renk, opacity ve transform ile çalışır. `prefers-reduced-motion` tercihinde giriş efektleri ve sayaç atlamalı hâle gelir.

### Typography System
Başlıklar için **Space Grotesk** veya yakın geometrik bir display sans, metin ve teknik kayıtlar için **IBM Plex Mono** kullanılacaktır. Ana ad, viewport genişliğine göre ölçeklenen çok ağır bir hiyerarşiye sahiptir. Monospace sadece sistem kaydı, dil etiketi, proje meta bilgisi ve küçük yardımcı metinlerde kullanılır; tüm metnin monospace yapılması önlenir.

### Brand Essence
**Yazılım mimarisini, uygulama ayrıntısından dijital ekosistem ölçeğine taşıyan bağımsız mühendislik portföyü.**

Kişilik: **sistematik, keskin, meraklı.**

### Brand Voice
Başlıklar emir kipinden uzak, kısa ve yapısal; CTA’lar ise açık ve işlevsel olacaktır. Boş vaat yerine kurulan sistemi ve yönü tarif eder.

Örnekler:

> “Digital ecosystems, engineered with intent.”

> “Open the project blueprint →”

### Wordmark & Logo
Marka işareti, Hermes’in hız/gönderi çağrışımını doğrudan figürleştirmeden; birbirini kesen iki siyah rota çizgisi, kare köşeli bir `H` negatif alanı ve küçük sarı bir yön noktasıyla anlatacaktır. İsim, varsayılan fontla yazılmış bir kelime işareti yerine ana başlıktaki güçlü display tipiyle, teknik koordinat alt metni eşliğinde kullanılacaktır.

### Signature Brand Color
**Signal Yellow — `#F5C518`**. Bu sarı, yalnızca yön, durum değişimi ve odak için kullanılan sahiplenilebilir marka sinyalidir.

## Uygulama Notları

- Sağlanan ana illüstrasyon hero yakınında, botanik parçalar ise kenar motifleri olarak kullanılacaktır; görsel hiçbir zaman okunabilir metnin arkasına yerleşmeyecektir.
- Açık alan, çoklu kolon ve kalın border kuralları; her bileşen ve CSS dosyasının üstünde yer alan kısa tasarım notuyla korunacaktır.
- Tasarım kararı sırasında şu soru kullanılacaktır: **“Bu seçim The Blueprint yaklaşımını güçlendiriyor mu, zayıflatıyor mu?”**

## Style Decisions

- **UI renk kuralı:** Tüm arayüz yüzeyleri ve tipografi, yalnızca sıcak kâğıt, siyah ve Signal Yellow `#F5C518` kullanacaktır. Yeşil, kırmızı, mavi ve teal yalnızca içe aktarılan illüstrasyonların içinde kalacaktır.
- **Botanik kuralı:** Botanik varlıklar grid sınırını kesen, kenardan kırpılmış ikincil motiflerdir; işlevsel hücre ya da bölümün baskın görsel dili olmayacaklardır.
- **Teknik çizim kuralı:** Her ana bölüm; koordinat etiketi, ölçüm işareti, kayıt noktası, kural çizgisi veya sistem durumu ibaresinden en az biriyle tek mühendislik çizim setinin parçası gibi davranacaktır.

- **Görselsiz yüzey kararı:** Kullanıcı talebi doğrultusunda hero dâhil hiçbir görüntü dosyası kullanılmayacaktır. Blueprint karakteri, yalnızca tipografi, CSS tabanlı rota çizgileri, düğüm noktaları, ölçüm ızgaraları ve geometrik modüllerle kurulacaktır.
- **Marka işareti kuralı:** Hermes markası; siyah yüzey üzerindeki negatif alan `H`, kesişen rota çağrışımı ve sarı yön noktasıyla oluşturulacak; düz harf monogramına indirgenmeyecektir.
- **Kayıt hiyerarşisi kuralı:** Uzun müşteri geri bildirimleri eşit ağırlıklı kart duvarı olarak değil; kolon etiketleri, öne çıkan kayıtlar ve varyasyonlu teknik işaretlerle düzenlenmiş alan notları olarak sunulacaktır.
