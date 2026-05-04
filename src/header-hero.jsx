import { useState, useEffect, useRef } from 'react';
import { COMPANY, PRODUCTS, BRANCHES } from './data.jsx';
import { ICONS_BY_PRODUCT, IconCar, IconHeart, IconHouse, IconPig, IconShield, IconCheck, IconPhone, IconArrow } from './icons.jsx';
import { AolLogo } from './logo.jsx';
import { TWEAKS } from './tweaks.js';

/* ---------- Topbar ---------- */
function useOfficeStatus() {
  const now = new Date();
  const day = now.getDay(); // 0=Pazar, 1=Pzt, ..., 6=Cmt
  const h = now.getHours();
  const m = now.getMinutes();
  const mins = h * 60 + m;
  if (day === 0) return { open: false, next: 'Pazartesi 09:00' };
  if (day >= 1 && day <= 5) {
    if (mins >= 9 * 60 && mins < 18 * 60) return { open: true };
    if (mins < 9 * 60) return { open: false, next: 'bugün 09:00' };
    return { open: false, next: 'yarın 09:00' };
  }
  if (day === 6) {
    if (mins >= 9 * 60 && mins < 14 * 60) return { open: true };
    if (mins < 9 * 60) return { open: false, next: 'bugün 09:00' };
    return { open: false, next: 'Pazartesi 09:00' };
  }
  return { open: false, next: 'Pazartesi 09:00' };
}

export function TopBar() {
  if (!TWEAKS.showTopBar) return null;
  const status = useOfficeStatus();
  return (
    <div className="topbar">
      <div className="container">
        <div className="row">
          <div className="l">
            {status.open
              ? <span className="live"><span className="d"></span>Şu an açığız · {COMPANY.hours}</span>
              : <span style={{ opacity: 0.7 }}>{COMPANY.hours}</span>
            }
          </div>
          <div className="r">
            <a href={`tel:${COMPANY.hq.phone.replace(/\s/g,'')}`}>{COMPANY.hq.phone}</a>
            <span style={{ opacity: 0.4 }}>·</span>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
export function Header({ route, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', on, { passive: true });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const nav = (path) => { go(path); setMenuOpen(false); };

  const active = (id) => {
    if (route === '/' && id === 'home') return true;
    if (route.startsWith('/hakkimizda') && id === 'about') return true;
    if (route.startsWith('/urunler') && id === 'products') return true;
    if (route.startsWith('/acenteliklerimiz') && id === 'agencies') return true;
    if (route.startsWith('/iletisim') && id === 'contact') return true;
    return false;
  };

  return (
    <>
      <TopBar />
      <header className={'nav' + (scrolled ? ' scrolled' : '')}>
        <div className="container">
          <div className="row">
            <a href="/" onClick={e => { e.preventDefault(); go('/'); }}
               style={{ display: 'inline-flex', alignItems: 'center' }}>
              <AolLogo height={scrolled ? 44 : 52} />
            </a>

            <nav className="nav-links">
              <a href="/" onClick={e => { e.preventDefault(); go('/'); }}
                 className={'nav-item' + (active('home') ? ' active' : '')}>Ana Sayfa</a>
              <a href="/hakkimizda" onClick={e => { e.preventDefault(); go('/hakkimizda'); }}
                 className={'nav-item' + (active('about') ? ' active' : '')}>Hakkımızda</a>
              <div className="has-dd">
                <a href="/urunler" onClick={e => { e.preventDefault(); go('/urunler'); }}
                   className={'nav-item' + (active('products') ? ' active' : '')}>
                  Ürünler
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 3.5l3 3 3-3"/></svg>
                </a>
                <div className="dd">
                  <div className="dd-grid">
                    {PRODUCTS.map(p => {
                      const Ico = ICONS_BY_PRODUCT[p.id];
                      return (
                        <a key={p.id} href={`/urunler/${p.id}`}
                           onClick={e => { e.preventDefault(); go(`/urunler/${p.id}`); }}
                           className="dd-item">
                          <span className="ic"><Ico size={20} /></span>
                          <div>
                            <div className="tt">{p.title}</div>
                            <div className="ds">{p.kicker}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              <a href="/acenteliklerimiz" onClick={e => { e.preventDefault(); go('/acenteliklerimiz'); }}
                 className={'nav-item' + (active('agencies') ? ' active' : '')}>Acentelikler</a>
              <a href="/iletisim" onClick={e => { e.preventDefault(); go('/iletisim'); }}
                 className={'nav-item' + (active('contact') ? ' active' : '')}>İletişim</a>
            </nav>

            <div className="nav-cta">
              <a className="nav-phone" href={`tel:${COMPANY.hq.phone.replace(/\s/g,'')}`}>
                <span className="icon"><IconPhone size={14} /></span>
                {COMPANY.hq.phone}
              </a>
              <button className="btn btn-primary btn-sm" onClick={() => go('/teklif-al')}>
                Teklif Al <span className="arrow"><IconArrow size={12} /></span>
              </button>
            </div>

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Menüyü aç">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div className={'mob-nav' + (menuOpen ? ' open' : '')} onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false); }}>
        <div className="mob-nav-panel">
          <div className="mob-nav-head">
            <AolLogo height={44} />
            <button className="mob-nav-close" onClick={() => setMenuOpen(false)} aria-label="Kapat">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/>
              </svg>
            </button>
          </div>
          <div className="mob-nav-links">
            {[['/', 'Ana Sayfa', 'home'], ['/hakkimizda', 'Hakkımızda', 'about'], ['/acenteliklerimiz', 'Acenteliklerimiz', 'agencies'], ['/iletisim', 'İletişim', 'contact']].map(([path, label, id]) => (
              <a key={id} href={path} onClick={e => { e.preventDefault(); nav(path); }}
                 className={'mob-nav-link' + (active(id) ? ' active' : '')}>{label}</a>
            ))}
            <div>
              <button className={'mob-nav-link' + (active('products') ? ' active' : '')}
                style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setProductsOpen(x => !x)}>
                Ürünler
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: productsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
                  <path d="M3 5l4 4 4-4"/>
                </svg>
              </button>
              {productsOpen && (
                <div className="mob-nav-sub">
                  {PRODUCTS.map(p => (
                    <a key={p.id} href={`/urunler/${p.id}`}
                       onClick={e => { e.preventDefault(); nav(`/urunler/${p.id}`); }}
                       className="mob-nav-link">{p.title}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mob-nav-footer">
            <a className="btn btn-secondary" href={`tel:${COMPANY.hq.phone.replace(/\s/g,'')}`}>
              <IconPhone size={14} /> {COMPANY.hq.phone}
            </a>
            <button className="btn btn-primary" onClick={() => nav('/teklif-al')}>
              Teklif Al <IconArrow size={12} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Hero Slider data ---------- */
export const HERO_SLIDES = [
  {
    id: 'kasko', cls: 'slide-kasko', img: '/assets/slide-kasko.jpg',
    title: 'Aracınız için tam kapsamlı koruma',
    desc: 'Kasko ve zorunlu trafik sigortasında 22 şirketi sizin için karşılaştırıyoruz. Hasar anında uçtan uca takip.',
    icon: 'car',
    meta: ['Yedek araç', 'Asistans 7/24', 'Cam kırılması'],
  },
  {
    id: 'saglik', cls: 'slide-saglik', img: '/assets/slide-saglik.jpg',
    title: 'Özel sağlıkta serbest hekim seçimi',
    desc: 'Özel hastane ağı, yurt içi ve yurt dışı teminat. Aile paketleri ve kurumsal çalışan grupları.',
    icon: 'heart',
    meta: ['Yatarak / Ayakta', 'Check-up', 'Yurt dışı'],
  },
  {
    id: 'konut', cls: 'slide-konut', img: '/assets/slide-konut.jpg',
    title: 'Konut ve işyeriniz güvencede',
    desc: 'Yangın, hırsızlık, deprem ve DASK dahil kişiye ve kuruma özel paketler.',
    icon: 'home',
    meta: ['Deprem / DASK', 'Yangın', 'Hırsızlık'],
  },
  {
    id: 'bes', cls: 'slide-bes', img: '/assets/slide-bes.jpg',
    title: 'Geleceğinizi bugünden planlayın',
    desc: 'Bireysel Emeklilik (BES) ile %30 devlet katkısı, esnek katkı payı ve fon seçim özgürlüğü.',
    icon: 'pig',
    meta: ['%30 devlet katkısı', 'Esnek ödeme', 'Fon seçimi'],
  },
];

/* ---------- Hero ---------- */
export function Hero({ go }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 5200);
    return () => clearInterval(timer.current);
  }, []);

  const jumpTo = (i) => {
    setIdx(i);
    clearInterval(timer.current);
    timer.current = setInterval(() => setIdx(x => (x + 1) % HERO_SLIDES.length), 6500);
  };
  const next = () => jumpTo((idx + 1) % HERO_SLIDES.length);
  const prev = () => jumpTo((idx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const iconFor = (n) => {
    const map = { car: IconCar, heart: IconHeart, home: IconHouse, pig: IconPig };
    const Ico = map[n] || IconShield;
    return <Ico size={32} />;
  };

  return (
    <section className="hero">
   
      <div className="container">
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <div className="chip" style={{ marginBottom: 20 }}>
              <span className="dot"></span>
              30 yıla yakın sektör deneyimi
            </div>
            <h1 className="display-1" style={{ margin: 0 }}>
              Sigortanızın
              <br/>
              <span style={{ color: 'var(--primary)', position: 'relative' }}>
                doğru adresi
                <svg style={{ position: 'absolute', left: 0, bottom: -8, width: '100%', height: 14 }} viewBox="0 0 300 14" preserveAspectRatio="none" fill="none">
                  <path d="M2 10 C 60 2, 160 2, 298 8" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" opacity="0.35"/>
                </svg>
              </span>
              .
            </h1>
            <p className="lead" style={{ maxWidth: 540, marginTop: 28 }}>
              22 sigorta şirketinin yetkili acentesi olarak; kasko, sağlık, konut, BES ve daha fazlasında
              size özel en uygun teklifi birlikte buluyoruz.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn-primary btn-lg" onClick={() => go('/teklif-al')}>
                Hızlı Teklif Al <span className="arrow"><IconArrow size={14} /></span>
              </button>
              <a className="btn btn-secondary btn-lg" href={`tel:${COMPANY.hq.phone.replace(/\s/g,'')}`}>
                <IconPhone size={14} /> Bizi Arayın
              </a>
            </div>

            {/* trust row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28 }}>
              <div className="avatars">
                <div className="av">AO</div>
                <div className="av">MK</div>
                <div className="av">SY</div>
                <div className="av more">+</div>
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--text-2)' }}>
                <strong style={{ color: 'var(--text)' }}>+12.000</strong> mutlu müşteri · {BRANCHES.map(b => b.city).join(', ')}
              </div>
            </div>

            {/* stats */}
            <div style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex' }}>
                {[
                  { v: <><span>30</span><span className="pct">+</span></>, l: 'Yıl sektör deneyimi' },
                  { v: <>20</>, l: 'Yetkili Sigorta Acenteliği' },
                  { v: <>5</>, l: 'Türkiye genelinde şube' },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, paddingLeft: i === 0 ? 0 : 20, borderLeft: i === 0 ? 'none' : '1px solid var(--border)' }}>
                    <div className="hero-stat-value">{s.v}</div>
                    <div className="hero-stat-label">{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                {[
                  { v: '+12.000', l: 'Mutlu müşteri' },
                  { v: '+21.000', l: 'Yönetilen poliçe' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'var(--primary-50)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500, lineHeight: 1.3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Creative slider */}
          <div>
            <div className="slider">
              <div className="slider-track">
                <div className="hv-ring" style={{ zIndex: 0 }}></div>
                <div className="hv-shape" style={{ zIndex: 0 }}></div>

                {HERO_SLIDES.map((s, i) => (
                  <div key={s.id} className={'slide ' + s.cls + (i === idx ? ' active' : '')}>
                    <img src={s.img} alt={s.title} className="slide-bg" />
                    <div className="slide-overlay"></div>
                    <div className="slide-head" style={{ position: 'relative', zIndex: 2 }}>
                      <span className="hv-badge slide-badge">
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }}></span>
                        {String(i + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')} · {s.id.toUpperCase()}
                      </span>
                      <span className="slide-icon-wrap">{iconFor(s.icon)}</span>
                    </div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <h3 className="slide-title slide-title-light">{s.title}</h3>
                      <p className="slide-desc slide-desc-light">{s.desc}</p>
                      <div className="slide-meta">
                        {s.meta.map(m => <div key={m}><IconCheck size={12} /> {m}</div>)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* floating cards */}
                <div className="hv-float hv-float-1">
                  <div className="ic"><IconShield size={18} /></div>
                  <div>
                    <div className="tt">22 şirket karşılaştırması</div>
                    <div className="ds">Tek başvuruyla</div>
                  </div>
                </div>
                <div className="hv-float hv-float-2">
                  <div className="ic"><IconCheck size={18} /></div>
                  <div>
                    <div className="tt">Ortalama 4 saatte</div>
                    <div className="ds">Teklif dönüşü</div>
                  </div>
                </div>

                <div className="slider-nav">
                  <button onClick={prev} aria-label="Önceki">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 2L4 7l5 5"/></svg>
                  </button>
                  <button onClick={next} aria-label="Sonraki">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 2l5 5-5 5"/></svg>
                  </button>
                </div>
              </div>

              <div className="slider-dots">
                {HERO_SLIDES.map((_, i) => (
                  <button key={i} className={i === idx ? 'active' : ''} onClick={() => jumpTo(i)} aria-label={'Slide ' + (i + 1)}></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
