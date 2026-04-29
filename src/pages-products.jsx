import { PRODUCTS } from './data.jsx';
import { ICONS_BY_PRODUCT, IconArrow, IconCheck } from './icons.jsx';
import { SectionLabel, PageHeader } from './components.jsx';
import { NotFound } from './pages-misc.jsx';

export function ProductsList({ go }) {
  return (
    <div className="page-enter">
      <PageHeader kicker="Ürünler" title={<>Yedi ürün, <span style={{ color: 'var(--primary)' }}>tek danışman.</span></>}
        lead="Kaskodan bireysel emekliliğe kadar tüm sigorta ürünlerinde uzman rehberlik."
        breadcrumb="Ana Sayfa / Ürünler" />
      <section className="section">
        <div className="container">
          <div className="r3-1 mob-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {PRODUCTS.map(p => {
              const Ico = ICONS_BY_PRODUCT[p.id];
              return (
                <a key={p.id} href={`/urunler/${p.id}`} onClick={e => { e.preventDefault(); go(`/urunler/${p.id}`); }}
                   className="card card-hover" style={{ padding: 28, color: 'var(--text)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}><Ico size={24} /></div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '20px 0 8px', letterSpacing: '-0.015em' }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                  <div style={{ marginTop: 16, fontSize: 13.5, fontWeight: 600, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>Detay <IconArrow size={12} /></div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProductDetail({ id, go }) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return <NotFound go={go} />;
  const Ico = ICONS_BY_PRODUCT[p.id];
  return (
    <div className="page-enter">
      <PageHeader kicker={p.kicker} title={p.title} lead={p.desc} breadcrumb={`Ana Sayfa / Ürünler / ${p.title}`} />

      {/* Featured product image */}
      <section style={{ paddingTop: 8 }}>
        <div className="container">
          <div className="product-detail-img" style={{ position: 'relative', height: 360, borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', background: 'linear-gradient(135deg, var(--primary-50), var(--slate-100))' }}>
            <img src={`/assets/product-${p.id}.jpg`} alt={p.title}
                 onError={e => { e.target.style.display = 'none'; }}
                 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.42) 50%, rgba(15,23,42,0.05) 100%)' }} />
            <div style={{ position: 'absolute', left: 36, right: 36, bottom: 32, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, color: '#fff' }}>
              <div style={{ maxWidth: 520 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 12px', borderRadius: 9999, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.28)', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-200)' }}>{p.idx}</span>
                  <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.4)' }}></span>
                  {p.kicker}
                </div>
                <div style={{ marginTop: 14, fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em' }}>{p.title}</div>
              </div>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.95)', color: 'var(--primary)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Ico size={30} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mob-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div className="card" style={{ padding: 32 }}>
              <SectionLabel>Teminat kapsamı</SectionLabel>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 12 }}>
                {p.coverage.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 15 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}><IconCheck size={12} /></span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="card" style={{ padding: 32 }}>
                <SectionLabel>Kimler için uygun?</SectionLabel>
                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 10 }}>
                  {p.forWhom.map((c, i) => (<li key={i} style={{ fontSize: 15 }}>— {c}</li>))}
                </ul>
              </div>
              <div className="card" style={{ marginTop: 16, padding: 32, background: 'linear-gradient(135deg, var(--primary-50), #fff)' }}>
                <h3 className="display-3">Teklif alın, biz kıyaslayalım.</h3>
                <p style={{ color: 'var(--text-2)', margin: '12px 0 20px' }}>22 şirket için tek başvuruyla.</p>
                <button className="btn btn-primary" onClick={() => go('/teklif-al')}>Teklif Al <IconArrow size={12} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
