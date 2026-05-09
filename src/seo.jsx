import { useEffect } from 'react';

const BASE = 'https://www.aol.gen.tr';

function setMeta(sel, attr, val) {
  const el = document.querySelector(sel);
  if (el) el.setAttribute(attr, val);
}

function upsertLD(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({ title, description, path, breadcrumbs, faq } = {}) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', `${BASE}${path}`);
    setMeta('link[rel="canonical"]', 'href', `${BASE}${path}`);

    if (breadcrumbs?.length) {
      upsertLD('ld-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${BASE}${b.path}`,
        })),
      });
    }

    if (faq?.length) {
      upsertLD('ld-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }

    return () => {
      document.getElementById('ld-breadcrumb')?.remove();
      document.getElementById('ld-faq')?.remove();
    };
  }, [title, description, path]);
}

export const HOME_FAQ = [
  { q: 'AOL Sigorta hangi şehirlerde hizmet veriyor?', a: 'Ankara merkez olmak üzere Denizli, İzmir Menemen ve İzmir Çiğli şubelerimizle Türkiye genelinde hizmet vermekteyiz.' },
  { q: 'Sigorta teklifi almak için ne gerekir?', a: 'Kasko için araç plakası ve ruhsat; sağlık için TC kimlik numarası ve doğum tarihi; konut için tapu bilgileri yeterlidir. Ücretsiz teklif için bizi arayabilir veya form üzerinden ulaşabilirsiniz.' },
  { q: 'Sigorta acentesi ile direkt şirketten poliçe almanın farkı nedir?', a: 'AOL Sigorta gibi çok şirketli acenteler +20 sigorta şirketinin tekliflerini karşılaştırarak size en uygun fiyatı sunar. Hasar süreçlerinde de sizin adınıza takibi yapar.' },
  { q: 'Hasar anında ne yapmalıyım?', a: 'Hasar durumunda önce güvende olduğunuzdan emin olun, ardından AOL Sigorta\'yı arayın. Tüm hasar sürecini sizin adınıza uçtan uca yönetiyoruz.' },
];

export const PRODUCT_FAQ = {
  'kasko': [
    { q: 'Kasko sigortası ne kapsar?', a: 'Kasko sigortası aracınızı trafik kazası, hırsızlık, yangın, doğal afet ve vandalizme karşı korur. Zorunlu trafik sigortasının kapsamadığı kendi aracınızdaki hasarları karşılar.' },
    { q: 'Kasko ile trafik sigortası arasındaki fark nedir?', a: 'Zorunlu trafik sigortası yalnızca üçüncü kişilere verilen zararları karşılar. Kasko ise kendi aracınızdaki hasarları güvence altına alır.' },
    { q: 'Kasko sigortası fiyatı neye göre belirlenir?', a: 'Aracın markası, modeli ve değeri; sürücü yaşı ve hasar geçmişi (bonus-malus); seçilen teminat paketi prim miktarını belirler. +20 şirketi karşılaştırarak en uygun teklifi sunuyoruz.' },
  ],
  'trafik-sigortasi': [
    { q: 'Zorunlu trafik sigortası neden gereklidir?', a: 'Türkiye\'de tüm motorlu araçlar için yasal zorunluluktur. Trafik kazasında karşı tarafın maddi ve bedeni zararlarını karşılar.' },
    { q: 'Trafik sigortası fiyatı nasıl belirlenir?', a: 'Araç tipi, motor hacmi, sürücü yaşı ve bonus-malus kademesi prim miktarını belirler.' },
    { q: 'Trafik sigortası olmadan araç kullanılabilir mi?', a: 'Hayır, zorunlu trafik sigortası olmadan araç kullanmak yasaktır. Tespiti halinde idari para cezası ve araç trafikten men yaptırımı uygulanır.' },
  ],
  'saglik-sigortasi': [
    { q: 'Özel sağlık sigortası ne işe yarar?', a: 'Anlaşmalı özel hastanelerde muayene, tetkik, ameliyat ve yatış masraflarını karşılar. SGK\'yı tamamlayıcı veya bağımsız poliçe seçenekleri mevcuttur.' },
    { q: 'Sağlık sigortası primini neler etkiler?', a: 'Yaş, mevcut sağlık durumu, kapsam genişliği ve seçilen hastane ağı prim miktarını belirler. Tamamlayıcı sağlık sigortası daha uygun fiyatlıdır.' },
    { q: 'Sağlık sigortasında bekleme süresi var mı?', a: 'Çoğu şirkette poliçe başlangıcından itibaren 1–3 ay bekleme süresi uygulanır. Doğum teminatı için bu süre genellikle 10–12 aydır.' },
  ],
  'konut-isyeri-sigortasi': [
    { q: 'Konut sigortası zorunlu mu?', a: 'Konut sigortası zorunlu değildir; ancak DASK (zorunlu deprem sigortası) her konut için yasal zorunluluktur. Konut sigortası yangın, hırsızlık ve su hasarı gibi ek riskleri kapsar.' },
    { q: 'Konut sigortası ile DASK arasındaki fark nedir?', a: 'DASK yalnızca deprem riskini karşılar ve zorunludur. Konut sigortası yangın, hırsızlık, sel, dolu ve cam kırılması gibi geniş kapsamlı teminat sunar.' },
    { q: 'İşyeri sigortası ne kapsar?', a: 'Yangın, hırsızlık, deprem ve su baskınının yanı sıra kira kaybı, iş durması ve üçüncü şahıs sorumluluk teminatlarını da kapsayabilir.' },
  ],
  'dask': [
    { q: 'DASK nedir ve zorunlu mu?', a: 'DASK (Doğal Afet Sigortaları Kurumu), depreme karşı yasal zorunluluk olan sigortadır. DASK olmadan tapu devri ve yapı ruhsatı işlemleri yapılamaz.' },
    { q: 'DASK ne kadar teminat sağlar?', a: 'Teminat, konutun büyüklüğüne ve yapı tarzına göre belirlenen azami limitler dahilinde deprem hasarını karşılar. Üst limiti aşan hasarlar için ek konut sigortası önerilir.' },
    { q: 'DASK\'ı her yıl yenilemek gerekiyor mu?', a: 'Evet, DASK poliçeleri 1 yıllık düzenlenir. AOL Sigorta olarak yenileme tarihlerinizi sizin adınıza takip ediyoruz.' },
  ],
  'bireysel-emeklilik': [
    { q: 'Bireysel Emeklilik Sistemi (BES) nedir?', a: 'BES, düzenli katkı payı ödeyerek emeklilik için birikim yapmanızı sağlayan devlet destekli bir sistemdir. Devlet, ödediğiniz katkının %30\'unu sisteme ekler.' },
    { q: 'BES\'te devlet katkısı ne kadar?', a: 'Devlet, yıllık ödediğiniz katkı payının %30\'unu sisteme ekler. Azami devlet katkısı asgari ücretin yıllık tutarının %30\'u kadardır.' },
    { q: 'BES\'ten ne zaman çıkabilirim?', a: '56 yaşını doldurmuş ve en az 10 yıl sistemde kalmış olmanız durumunda devlet katkısının tamamından yararlanırsınız. Öncesinde çıkılabilir ancak devlet katkısı iade edilir.' },
  ],
  'ferdi-kaza': [
    { q: 'Ferdi kaza sigortası ne kapsar?', a: 'Kaza sonucu ölüm, sürekli sakatlık ve tedavi masraflarını teminat altına alır. Trafik kazaları, iş kazaları ve günlük yaşam kazalarını kapsar.' },
    { q: 'Ferdi kaza sigortası kimler için önerilir?', a: 'Özellikle serbest meslek sahipleri, sık seyahat edenler ve işçi sigortası olmayan bireyler için büyük önem taşır.' },
  ],
  'hayat-sigortasi': [
    { q: 'Hayat sigortası neden önemlidir?', a: 'Vefat veya ağır hastalık durumunda ailenizin geçimini güvence altına alır. Kredi hayat sigortası ise borçların ailenize kalmamasını sağlar.' },
    { q: 'Hayat sigortası primini neler etkiler?', a: 'Yaş, sağlık durumu, sigara kullanımı, meslek ve seçilen teminat tutarı prim miktarını belirler.' },
  ],
  'seyahat-sigortasi': [
    { q: 'Yurt dışı seyahat sigortası zorunlu mu?', a: 'Schengen vizesi için zorunludur. Tıbbi tahliye, bagaj kaybı ve uçuş iptali gibi ek teminatlar da seyahatte büyük güvence sağlar.' },
    { q: 'Yurt içi seyahat sigortası var mı?', a: 'Evet, yurt içi seyahat sigortası da mevcuttur. Kaza, bagaj kaybı ve acil tıbbi müdahale masraflarını karşılar.' },
  ],
  'nakliyat-sigortasi': [
    { q: 'Nakliyat sigortası ne kapsar?', a: 'Kara, deniz ve hava yoluyla taşınan malların hasar, kayıp ve çalınma risklerine karşı güvence sağlar.' },
    { q: 'Nakliyat sigortası kimler için gereklidir?', a: 'İhracatçılar, ithalatçılar, lojistik firmaları ve düzenli mal taşıyan işletmeler için büyük önem taşır.' },
  ],
  'kurumsal-endustriyel': [
    { q: 'Kurumsal sigorta nedir?', a: 'İşletmelerin yangın, hırsızlık, deprem, makine arızası, iş durması ve sorumluluk gibi risklerini kapsamlı şekilde güvence altına alan sigorta çözümleridir.' },
    { q: 'Endüstriyel risk sigortası kimlere hitap eder?', a: 'Fabrikalar, büyük depolar, enerji tesisleri ve üretim işletmeleri için özel olarak tasarlanmış teminat paketleri sunulmaktadır.' },
  ],
};
