// Shared data
const COMPANY = {
  name: 'Artı Oluşum Sigorta',
  short: 'AOL Sigorta',
  slogan: 'Memnuniyetiniz için uzman bir takım',
  hq: {
    label: 'Ankara — Merkez',
    phone: '+90 312 468 34 50',
    addr: 'Aziziye Mah. Cinnah Cad. No:50/12, Çankaya / Ankara'
  },
  branch: {
    label: 'Denizli — Şube',
    phone: '+90 258 264 68 69',
    addr: 'Sümer Mah. 2482/2 Sok. Sky City No:4/1 D:73, Merkezefendi / Denizli'
  },
  email: 'bilgi@aol.gen.tr',
  quoteEmail: 'ortak@aol.gen.tr',
  hours: 'Pzt – Cmt · 08:30 – 18:30',
  domain: 'aol.gen.tr'
};

const STATS = [
  { n: '30',  s: 'yıla yakın', l: 'Sektör deneyimi' },
  { n: '22',  s: 'sigorta şirketi', l: 'Aktif acentelik' },
  { n: '7',   s: 'ana kategori', l: 'Ürün portföyü' },
  { n: '2',   s: 'şehir', l: 'Ankara + Denizli' },
];

const PRODUCTS = [
  {
    id: 'kasko',
    idx: '01',
    title: 'Kasko Sigortası',
    kicker: 'Aracınız için tam koruma',
    desc: 'Çarpma, çalınma, yangın ve doğal afetlere karşı aracınızı kapsamlı şekilde güvence altına alır.',
    coverage: ['Kaza sonucu hasar', 'Çalınma ve yangın', 'Doğal afetler', 'Yedek araç hizmeti', 'Cam kırılması', 'Asistans'],
    forWhom: ['Yeni araç sahipleri', 'Günlük aracını kullananlar', 'Ticari araç sahipleri'],
  },
  {
    id: 'trafik-sigortasi',
    idx: '02',
    title: 'Trafik Sigortası',
    kicker: 'Yasal zorunluluk, hızlı işlem',
    desc: 'Karayolları Trafik Kanunu gereği zorunlu olan üçüncü şahıs mali mesuliyet sigortası.',
    coverage: ['Maddi hasar', 'Bedeni zarar', 'Ölüm ve sakatlık', 'Üçüncü şahıs teminatı'],
    forWhom: ['Tüm araç sahipleri (zorunlu)'],
  },
  {
    id: 'konut-isyeri',
    idx: '03',
    title: 'Konut ve İşyeri Sigortası',
    kicker: 'Yaşam ve iş alanınız için',
    desc: 'Yangın, hırsızlık, deprem, su baskını gibi risklere karşı kişiye ve kuruma özel paketler.',
    coverage: ['Yangın ve duman', 'Hırsızlık', 'Deprem', 'Su baskını ve sel', 'İç su hasarları', 'Cam kırılması'],
    forWhom: ['Ev sahipleri ve kiracılar', 'İşyeri sahipleri', 'Site yönetimleri'],
  },
  {
    id: 'bireysel-emeklilik',
    idx: '04',
    title: 'Bireysel Emeklilik',
    kicker: 'BES — Tasarruf ve yatırım',
    desc: 'Gönüllü katılım esasıyla, uzun vadeli tasarruf ve yatırım odaklı emeklilik planları.',
    coverage: ['%30 devlet katkısı', 'Esnek katkı payı', 'Fon tercih özgürlüğü', 'Birikim taşıma hakkı'],
    forWhom: ['18 yaş üstü bireyler', 'Kendi emeklilik planını kurmak isteyenler'],
  },
  {
    id: 'saglik-sigortasi',
    idx: '05',
    title: 'Sağlık Sigortası',
    kicker: 'Özel sağlık güvencesi',
    desc: 'Özel hastane ağı, serbest hekim seçimi, yurt içi ve yurt dışı teminat seçenekleri.',
    coverage: ['Yatarak tedavi', 'Ayakta tedavi', 'Doğum teminatı (opsiyonel)', 'Check-up', 'Yurt dışı kapsam', 'Diş paketi'],
    forWhom: ['Aileler', 'Çalışan profesyoneller', 'Şirket çalışan grupları'],
  },
  {
    id: 'nakliyat-sigortasi',
    idx: '06',
    title: 'Nakliyat Sigortası',
    kicker: 'Kara, deniz, hava, demir yolu',
    desc: 'Emtianın taşınması sırasında oluşabilecek hasar, kayıp ve çalınmalara karşı güvence.',
    coverage: ['Tam ziya', 'Hasar teminatı', 'Savaş ve grev', 'Yükleme/boşaltma'],
    forWhom: ['İthalatçı / ihracatçı firmalar', 'Lojistik şirketleri', 'Toptan ticaret işletmeleri'],
  },
  {
    id: 'dogum-sigortasi',
    idx: '07',
    title: 'Doğum Sigortası',
    kicker: 'Hamilelik ve doğum özel ürünü',
    desc: 'Hamilelik takibi ve doğum giderlerini kapsayan, bekleme süresi olmayan özel ürün.',
    coverage: ['Hamilelik takibi', 'Normal ve sezaryen doğum', 'Yenidoğan bakımı', 'Doğum komplikasyonları'],
    forWhom: ['Aile planlaması yapanlar', 'Hamile anne adayları'],
  },
];

const AGENCIES = [
  'Anadolu Sigorta', 'Aksigorta', 'AXA Sigorta', 'Allianz Sigorta',
  'Ankara Sigorta', 'Mapfre Sigorta', 'Türkiye Sigorta', 'Doğa Sigorta',
  'Şeker Sigorta', 'Ray Sigorta', 'Türk Nippon Sigorta', 'Neova Sigorta',
  'Zurich Sigorta', 'Sompo Sigorta', 'Hepİyi Sigorta', 'Quick Sigorta',
  'HDI Sigorta', 'Gulf Sigorta', 'Koru Sigorta', 'Orient Sigorta',
  'BNP Paribas Cardif', 'ViennaLife Emeklilik'
];

const NAV = [
  { id: 'home', label: 'Ana Sayfa', path: '/' },
  { id: 'about', label: 'Hakkımızda', path: '/hakkimizda' },
  {
    id: 'products', label: 'Ürünler', path: '/urunler',
    children: PRODUCTS.map(p => ({ id: p.id, label: p.title, path: '/urunler/' + p.id, idx: p.idx }))
  },
  { id: 'agencies', label: 'Acenteliklerimiz', path: '/acenteliklerimiz' },
  { id: 'contact', label: 'İletişim', path: '/iletisim' },
];

Object.assign(window, { COMPANY, STATS, PRODUCTS, AGENCIES, NAV });
