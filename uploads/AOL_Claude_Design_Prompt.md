# AOL Sigorta – Claude Design Prompt

## Amaç
Artı Oluşum Sigorta (AOL) için modern, güven veren ve dönüşüm odaklı bir web sitesi tasarımı oluştur.

---

## Marka Kimliği

**Şirket:** Artı Oluşum Sigorta Aracılık Hizmetleri Ltd. Şti.  
**Kısa Ad:** AOL Sigorta  
**Web:** aol.gen.tr  
**Renk Paleti:** Ana renk koyu kırmızı (#C0182A), beyaz arka plan, açık gri aksanlar  
**Logo:** Kalın italik "AOL" harfleri, kırmızı, dinamik ve güçlü tipografi  
**Ton:** Profesyonel, güvenilir, sıcak, erişilebilir  
**Konum:** Ankara (merkez) + Denizli (şube)  
**Çalışma saatleri:** Pzt–Cmt 08:30–18:30

---

## Şirket Hakkında (Hakkımızda İçeriği)

- 30 yıla yakın sektör deneyimi (müşteri → şirket çalışanı → 20 yıldır acente)
- Türkiye'nin en büyük ve uluslararası sigorta şirketlerinde çalışma ve yöneticilik geçmişi
- 22 farklı sigorta şirketinin acentesi (ulusal + uluslararası)
- Uzman ekip, operasyon kalitesine verilen önem
- Slogan fikirlerinden yararlanılabilir: *"Memnuniyetiniz İçin Uzman Bir Takım"*

---

## Ürün ve Hizmetler (6 Ana Kategori)

1. **Kasko ve Trafik Sigortası** – Zorunlu trafik + araç hasarı/çalınma/yangın
2. **Konut ve İşyeri Sigortası** – Yangın, hırsızlık, deprem, su baskını; kişiye/kuruma özel paket
3. **Bireysel Emeklilik (BES)** – Gönüllü, tasarruf + yatırım odaklı
4. **Sağlık Sigortası** – Özel sağlık, serbest hekim seçimi, yurt içi/dışı kapsam
5. **Nakliyat Sigortası** – Kara/hava/deniz/demir yolu taşımacılık güvencesi
6. **Doğum Sigortası** – Hamilelik ve doğum giderlerini kapsayan özel ürün (bekleme süresi yok)

---

## Acentelikler (22 Şirket)

Anadolu Sigorta, Aksigorta, AXA Sigorta, Allianz Sigorta, Ankara Sigorta, Mapfre Sigorta, Türkiye Sigorta, Doğa Sigorta, Şeker Sigorta, Ray Sigorta, Türk Nippon Sigorta, Neova Sigorta, Zurich Sigorta, Sompo Sigorta, Hepİyi Sigorta, Quick Sigorta, HDI Sigorta, Gulf Sigorta, Koru Sigorta, Orient Sigorta, BNP Paribas Cardif Emeklilik ve Hayat, ViennaLife Hayat ve Emeklilik

---

## Hızlı Teklif Formu (Kritik Özellik)

Teklif talepleri **ortak@aol.gen.tr** adresine düşmeli.

### Form 1 – Trafik / Kasko Teklifi
Zorunlu alanlar:
- Ruhsat sahibi T.C. Kimlik No + doğum tarihi + meslek
- Araç plakası
- Araç ruhsat/belge seri numarası
- **Ruhsat yükleme alanı** (isteğe bağlı dosya upload)

### Form 2 – Özel Sağlık Sigortası Teklifi
Zorunlu alanlar:
- Her katılımcı için T.C. Kimlik No + doğum tarihi
- İlk poliçe mi / devam eden poliçe mi?
- Devam poliçesiyse: hangi şirketten?

> Her iki form da tek sayfada, sade, mobil uyumlu olmalı. Gönderim sonrası kullanıcıya onay mesajı göster.

---

## İletişim Bilgileri

| Alan | Değer |
|------|-------|
| Tel 1 | +90 312 468 34 50 (Ankara) |
| Tel 2 | +90 258 264 68 69 (Denizli) |
| E-posta | bilgi@aol.gen.tr |
| Teklif maili | ortak@aol.gen.tr |
| Merkez adres | Aziziye Mah. Cinnah Cad. No:50/12, Çankaya / Ankara |
| Şube adres | Sümer Mah. 2482/2 Sok. Sky City No:4/1 D:73, Merkezefendi / Denizli |

---

## Tasarım Yönergeleri

### Genel Stil
- Modern, temiz, güven veren kurumsal tasarım
- Kırmızı (#C0182A) CTA butonlarda ve vurgu elementlerinde kullan
- Fazla görsel gürültüden kaçın; beyaz alan kullan
- Türkçe içerik, Latin karakter seti

### Sayfa Yapısı Önerileri

**Header:**
- Logo (sol), nav linkleri (sağ), telefon numarası ve "Teklif Al" CTA butonu görünür olmalı
- Sticky header, scroll'da daralan versiyon

**Hero Section:**
- Güven mesajı ön planda: "30 Yıla Yakın Deneyim", "22 Sigorta Şirketi"
- Ana CTA: "Hızlı Teklif Al" butonu
- İkincil CTA: "Bizi Arayın"

**Ürünler Grid:**
- 6 ürün kartı (ikon + başlık + kısa açıklama + "Detay" linki)
- Hover efektli, kırmızı accent

**Acentelikler:**
- Logo veya marka ismi grid'i (22 şirket)
- "Güçlü iş ortaklarımız" başlığı

**Hızlı Teklif Formu:**
- Tab veya accordion: "Kasko/Trafik" | "Sağlık Sigortası"
- Minimal alan, mobil öncelikli

**Footer:**
- Logo, adresler (Ankara + Denizli), hızlı linkler, iletişim, çalışma saatleri

### Bileşen Öncelikleri (Token Tasarrufu İçin)
Tek seferde istenecek bileşenler şu sıradadır:
1. Header + Hero (önce bunları oluştur)
2. Ürünler bölümü
3. Teklif formu (en kritik işlevsel element)
4. Acentelikler + Footer

---

## Teknik Notlar
- React (JSX) veya tek dosya HTML/CSS tercih et
- Tailwind utility class kullan
- Form submit: `mailto:ortak@aol.gen.tr` veya fetch ile simüle et
- Mobil responsive zorunlu
- Renk sabitleri: `--color-primary: #C0182A`, `--color-primary-dark: #9B1220`
