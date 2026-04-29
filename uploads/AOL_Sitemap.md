# AOL Sigorta – Site Haritası (Sitemap)

## Mevcut Yapı → Önerilen Yeni Yapı

---

## 1. Ana Sayfa `/`
- Hero bölümü (slogan + CTA)
- Kısa Hakkımızda özeti
- 6 Ürün kartları (önizleme)
- Hızlı Teklif Formu (Kasko/Trafik + Sağlık tabları)
- Acentelikler logoları
- Neden Biz? (sayısal istatistikler: 30 yıl, 22 şirket vb.)
- İletişim özeti + Harita

---

## 2. Hakkımızda `/hakkimizda`
- Şirket hikayesi ve vizyon
- Deneyim vurgusu (30 yıl, 20 yıl acente)
- Ekip / Operasyon kalitesi
- Değerler

---

## 3. Ürünler `/urunler`
Ana liste sayfası (6 ürünün kartları)

### Alt Sayfalar:
| Sayfa | URL |
|-------|-----|
| Kasko Sigortası | `/urunler/kasko` |
| Trafik Sigortası | `/urunler/trafik-sigortasi` |
| Konut ve İşyeri Sigortası | `/urunler/konut-isyeri` |
| Bireysel Emeklilik (BES) | `/urunler/bireysel-emeklilik` |
| Sağlık Sigortası | `/urunler/saglik-sigortasi` |
| Nakliyat Sigortası | `/urunler/nakliyat-sigortasi` |
| Doğum Sigortası | `/urunler/dogum-sigortasi` |

Her ürün sayfası içeriği:
- Ürün açıklaması
- Teminat kapsamı
- Kimler için uygun?
- "Teklif Al" CTA butonu (forma yönlendir)

---

## 4. Teklif Al `/teklif-al`
Hızlı teklif formu (ana sayfa formuyla aynı, bağımsız sayfa)

### Alt Formlar:
| Form | URL |
|------|-----|
| Kasko / Trafik Teklifi | `/teklif-al/kasko-trafik` |
| Sağlık Sigortası Teklifi | `/teklif-al/saglik` |

Form gönderimi → **ortak@aol.gen.tr**

---

## 5. Acenteliklerimiz `/acenteliklerimiz`
- 22 sigorta şirketinin logoları / isimleri
- Kısa açıklama: "Türkiye'nin önde gelen sigorta şirketlerinin güvenilir acentesiyiz"
- Şirket bazında kısa bilgi (isteğe bağlı genişletme)

---

## 6. İletişim `/iletisim`
- İki ofis adresi (Ankara + Denizli)
- Telefon numaraları
- E-posta: bilgi@aol.gen.tr
- Çalışma saatleri
- Google Maps embed (her iki lokasyon)
- İletişim formu (genel sorgu)

---

## Statik / Teknik Sayfalar
| Sayfa | URL |
|-------|-----|
| 404 Hata | `/404` |
| Gizlilik Politikası | `/gizlilik-politikasi` |
| KVKK Aydınlatma Metni | `/kvkk` |

---

## Gezinme Yapısı (Navigation)

```
Ana Sayfa
├── Hakkımızda
├── Ürünler
│   ├── Kasko Sigortası
│   ├── Trafik Sigortası
│   ├── Konut ve İşyeri Sigortası
│   ├── Bireysel Emeklilik
│   ├── Sağlık Sigortası
│   ├── Nakliyat Sigortası
│   └── Doğum Sigortası
├── Acenteliklerimiz
├── Teklif Al  ← (Header'da CTA butonu)
└── İletişim
```

---

## Öncelik Sırası (Geliştirme İçin)

| Öncelik | Sayfa | Gerekçe |
|---------|-------|---------|
| 🔴 Kritik | Ana Sayfa | Tüm trafiğin giriş noktası |
| 🔴 Kritik | Teklif Al formu | Doğrudan gelir etkisi |
| 🟠 Yüksek | Ürün alt sayfaları | SEO + bilgi talebi |
| 🟠 Yüksek | İletişim | Dönüşüm tamamlama |
| 🟡 Orta | Hakkımızda | Güven inşası |
| 🟡 Orta | Acenteliklerimiz | Referans güvencesi |
| 🟢 Düşük | KVKK / Gizlilik | Yasal zorunluluk |
