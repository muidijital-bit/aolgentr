import { useState } from 'react';
import { PRODUCTS, AGENCIES } from './data.jsx';
import { ICONS_BY_PRODUCT, IconArrow } from './icons.jsx';
import { SectionLabel } from './components.jsx';
import { QuoteFormKasko, QuoteFormSaglik } from './pages-misc.jsx';

/* ---------- Products section ---------- */
export function ProductsSection({ go }) {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, marginBottom: 48, flexWrap: 'wrap' }}>
          <div>
            <SectionLabel>Ürünler</SectionLabel>
            <h2 className="display-2" style={{ margin: '14px 0 0', maxWidth: '14ch' }}>
              Her ihtiyaca uygun <span style={{ color: 'var(--primary)' }}>bir poliçe.</span>
            </h2>
          </div>
          <p className="lead" style={{ maxWidth: 420, margin: 0 }}>
            Zorunlu teminatlardan bireysel planlara — yedi ana ürün kategorisinde uzman danışmanlık.
          </p>
        </div>
        <div className="r4-2 mob-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {PRODUCTS.map(p => {
            const Ico = ICONS_BY_PRODUCT[p.id];
            return (
              <a key={p.id} href={`/urunler/${p.id}`} onClick={e => { e.preventDefault(); go(`/urunler/${p.id}`); }}
                 className="card card-hover" style={{ padding: 24, display: 'flex', flexDirection: 'column', minHeight: 220, color: 'var(--text)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center', border: '1px solid var(--primary-100)' }}>
                  <Ico size={22} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', margin: '20px 0 8px' }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.55, margin: 0 }}>{p.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 13.5, fontWeight: 600, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Detay <IconArrow size={12} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- About strip ---------- */
export function AboutStrip({ go }) {
  return (
    <section className="section" style={{ background: 'var(--slate-50)' }}>
      <div className="container">
        <div className="mob-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <SectionLabel>Hakkımızda</SectionLabel>
            <h2 className="display-2" style={{ margin: '14px 0 20px' }}>
              30 yıllık deneyim, <span style={{ color: 'var(--primary)' }}>butik bir disiplinle.</span>
            </h2>
            <p className="lead">
              Önce müşteri, sonra Türkiye'nin en büyük sigorta şirketlerinde yönetici, son 20 yıldır bağımsız acente.
              Kurumsal deneyim ve butik operasyon bir arada.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 32 }}>
              {[['30+', 'Yıl deneyim'], ['20', 'Yıl acente'], ['22', 'Şirket']].map(([a, b], i) => (
                <div key={i} className="card" style={{ padding: 20 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--primary)' }}>{a}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>{b}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <button className="btn btn-secondary" onClick={() => go('/hakkimizda')}>Hakkımızda <IconArrow size={12} /></button>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <img src="/assets/about-main.jpg" alt="30 yıllık güvenilir iş ortaklığı"
                 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.55) 70%, rgba(15,23,42,0.92) 100%)' }} />
            <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28, color: '#fff' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 88, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.05em' }}>
                30<span style={{ color: 'var(--primary-200)' }}>+</span>
              </div>
              <div style={{ marginTop: 12, fontSize: 18, fontWeight: 600 }}>Yılı aşkın güvenilirlik</div>
              <div style={{ marginTop: 4, fontSize: 13.5, color: 'rgba(255,255,255,0.75)' }}>Sigorta sektöründe</div>
            </div>
            <div style={{ position: 'absolute', top: 24, left: 24, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(255,255,255,0.95)', backdrop: 'blur(8px)', borderRadius: 9999, fontSize: 12.5, fontWeight: 600, color: 'var(--text)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }}></span>
              Hakkımızda · 1995'ten bu yana
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Quick Quote (form embed) ---------- */
export function QuickQuote({ go }) {
  const [tab, setTab] = useState('kasko');
  return (
    <section className="section">
      <div className="container">
        <div className="mob-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'flex-start' }}>
          <div>
            <SectionLabel>Hızlı Teklif</SectionLabel>
            <h2 className="display-2" style={{ margin: '14px 0 20px' }}>
              Dakikalar içinde <span style={{ color: 'var(--primary)' }}>teklifiniz hazır.</span>
            </h2>
            <p className="lead">22 sigorta şirketinden size özel en uygun teklifleri sizin için kıyaslıyoruz.</p>
          </div>
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
              <button onClick={() => setTab('kasko')} style={{ padding: 18, fontWeight: 600, color: tab === 'kasko' ? 'var(--primary)' : 'var(--text-2)', background: tab === 'kasko' ? 'var(--primary-50)' : 'transparent', borderRight: '1px solid var(--border)' }}>Kasko / Trafik</button>
              <button onClick={() => setTab('saglik')} style={{ padding: 18, fontWeight: 600, color: tab === 'saglik' ? 'var(--primary)' : 'var(--text-2)', background: tab === 'saglik' ? 'var(--primary-50)' : 'transparent' }}>Sağlık Sigortası</button>
            </div>
            <div style={{ padding: 28 }}>
              {tab === 'kasko' ? <QuoteFormKasko compact /> : <QuoteFormSaglik compact />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Agency logo card ---------- */
function AgencyCard({ agency, tall = false }) {
  const [imgFailed, setImgFailed] = useState(false);
  const h = tall ? 56 : 44;
  return (
    <div className="card" style={{
      padding: '16px 12px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {!imgFailed ? (
        <div className="agency-logo-wrap" style={{ width: '100%', height: h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={agency.logo}
            alt={agency.name}
            onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      ) : (
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', lineHeight: 1.3, textAlign: 'center' }}>{agency.name}</span>
      )}
    </div>
  );
}

/* ---------- Agencies ---------- */
export function AgenciesSection({ go, compact = false }) {
  return (
    <section className="section" style={{ background: 'var(--slate-50)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, marginBottom: 36, flexWrap: 'wrap' }}>
          <div>
            <SectionLabel>Acentelikler</SectionLabel>
            <h2 className="display-2" style={{ margin: '14px 0 0' }}>22 güçlü iş ortağı.</h2>
          </div>
          {!compact && <button className="btn btn-secondary" onClick={() => go('/acenteliklerimiz')}>Tümünü gör <IconArrow size={12} /></button>}
        </div>
        <div className="agencies-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {AGENCIES.map(a => (
            <AgencyCard key={a.name} agency={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
