import { useState, useEffect } from 'react';
import { PRODUCTS } from './data.jsx';
import { ICONS_BY_PRODUCT, IconArrow, IconCheck } from './icons.jsx';
import { PageHeader } from './components.jsx';
import { NotFound } from './pages-misc.jsx';
import { supabase } from './supabase.js';

export function ProductsList({ go }) {
  const [dbMap, setDbMap] = useState({});
  useEffect(() => {
    supabase.from('products').select('*')
      .then(({ data }) => { if (data) setDbMap(Object.fromEntries(data.map(p => [p.id, p]))); });
  }, []);

  const staticVisible = PRODUCTS.filter(p => !dbMap[p.id]?.hidden);
  const customVisible = Object.values(dbMap).filter(p => p.is_custom && !p.hidden && !PRODUCTS.find(s => s.id === p.id));
  const all = [...staticVisible.map(p => ({ ...p, ...(dbMap[p.id] || {}) })), ...customVisible];

  const DefaultIco = ({ size }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l10 9H2z"/></svg>;

  return (
    <div className="page-enter">
      <PageHeader kicker="Ürünler" title={<>11 ürün kategorisi, <span style={{ color: 'var(--primary)' }}>tek danışman.</span></>}
        lead="Kasko ve trafik sigortasından bireysel emeklilik ve nakliyata kadar tüm sigorta ihtiyaçlarınızda uzman rehberlik."
        breadcrumb="Ana Sayfa / Ürünler" />
      <section className="section">
        <div className="container">
          <div className="r3-1 mob-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {all.map(p => {
              const Ico = ICONS_BY_PRODUCT[p.id] || DefaultIco;
              return (
                <a key={p.id} href={`/urunler/${p.id}`} onClick={e => { e.preventDefault(); go(`/urunler/${p.id}`); }}
                   className="card card-hover" style={{ padding: 28, color: 'var(--text)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}><Ico size={24} /></div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '20px 0 8px', letterSpacing: '-0.015em' }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>{p.desc || p.desc_short}</p>
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

function ProductContactForm({ productTitle }) {
  const [s, setS] = useState({ name: '', phone: '', email: '', note: '', consent: false });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!s.name.trim()) er.name = 'Ad soyad gerekli.';
    if (!/^\+?[\d\s]{10,}$/.test(s.phone)) er.phone = 'Geçerli bir telefon giriniz.';
    if (s.email && !/\S+@\S+\.\S+/.test(s.email)) er.email = 'Geçerli bir e-posta giriniz.';
    if (!s.consent) er.consent = 'KVKK onayı gerekli.';
    setErrs(er);
    if (!Object.keys(er).length) setSent(true);
  };

  const ip = { padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' };
  const F = ({ label, err, children }) => (
    <label style={{ display: 'grid', gap: 5 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{label}</span>
      {children}
      {err && <span style={{ fontSize: 12, color: 'var(--primary)' }}>{err}</span>}
    </label>
  );

  if (sent) return (
    <div style={{ padding: '24px 0', textAlign: 'center' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}><IconCheck size={22} /></div>
      <h4 className="display-3" style={{ margin: '0 0 6px' }}>Talebiniz alındı.</h4>
      <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>En kısa sürede sizi arayacağız.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
      <div className="mob-xs-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Ad Soyad *" err={errs.name}><input style={ip} value={s.name} onChange={e => setS({ ...s, name: e.target.value })} /></F>
        <F label="Telefon *" err={errs.phone}><input style={ip} type="tel" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} /></F>
      </div>
      <F label="E-posta" err={errs.email}><input style={ip} type="email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} /></F>
      <F label="Notunuz">
        <textarea style={{ ...ip, resize: 'vertical', minHeight: 80 }} value={s.note} onChange={e => setS({ ...s, note: e.target.value })} />
      </F>
      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13, cursor: 'pointer' }}>
        <input type="checkbox" style={{ marginTop: 1 }} checked={s.consent} onChange={e => setS({ ...s, consent: e.target.checked })} />
        <span>KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum.</span>
      </label>
      {errs.consent && <span style={{ fontSize: 12, color: 'var(--primary)', marginTop: -8 }}>{errs.consent}</span>}
      <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>
        Gönder <IconArrow size={12} />
      </button>
    </form>
  );
}

export function ProductIllust({ id }) {
  const c = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const st = { width: '100%', maxWidth: 260, height: 'auto', color: 'var(--primary)' };
  const w = '1.5'; const l = '1';

  if (id === 'kasko') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <path strokeWidth={w} d="M24 142 C28 126 50 104 76 98 H184 C210 104 234 126 238 142 Z"/>
      <path strokeWidth={w} d="M12 142 H250 V163 C250 166 247 168 244 168 H18 C15 168 12 166 12 163 Z"/>
      <path strokeWidth={w} d="M82 98 L96 66 H168 L186 98"/>
      <line strokeWidth={l} x1="130" y1="66" x2="130" y2="98" opacity="0.4"/>
      <line strokeWidth={l} x1="130" y1="98" x2="130" y2="142" opacity="0.4"/>
      <circle strokeWidth={w} cx="70" cy="168" r="22"/><circle strokeWidth={w} cx="70" cy="168" r="9"/>
      <circle strokeWidth={w} cx="190" cy="168" r="22"/><circle strokeWidth={w} cx="190" cy="168" r="9"/>
      <path strokeWidth={w} d="M250 22 L268 30 L268 52 C268 64 259 69 259 71 C259 69 250 64 250 52 Z"/>
      <path strokeWidth={w} d="M255 48 L258.5 52 L265 41"/>
    </svg>
  );

  if (id === 'trafik-sigortasi') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <line strokeWidth={l} x1="0" y1="170" x2="280" y2="170" opacity="0.25"/>
      <line strokeWidth={l} x1="10" y1="148" x2="48" y2="148" opacity="0.35"/>
      <line strokeWidth={l} x1="66" y1="148" x2="104" y2="148" opacity="0.35"/>
      <line strokeWidth={l} x1="176" y1="148" x2="214" y2="148" opacity="0.35"/>
      <line strokeWidth={l} x1="232" y1="148" x2="270" y2="148" opacity="0.35"/>
      <path strokeWidth={w} d="M8 122 C12 110 26 102 40 100 H72 C86 102 98 110 102 122 Z"/>
      <path strokeWidth={w} d="M2 122 H108 V139 C108 142 105 144 102 144 H8 C5 144 2 142 2 139 Z"/>
      <circle strokeWidth={w} cx="24" cy="144" r="14"/><circle strokeWidth={w} cx="24" cy="144" r="6"/>
      <circle strokeWidth={w} cx="84" cy="144" r="14"/><circle strokeWidth={w} cx="84" cy="144" r="6"/>
      <path strokeWidth={w} d="M272 122 C268 110 254 102 240 100 H208 C194 102 182 110 178 122 Z"/>
      <path strokeWidth={w} d="M278 122 H172 V139 C172 142 175 144 178 144 H272 C275 144 278 142 278 139 Z"/>
      <circle strokeWidth={w} cx="256" cy="144" r="14"/><circle strokeWidth={w} cx="256" cy="144" r="6"/>
      <circle strokeWidth={w} cx="196" cy="144" r="14"/><circle strokeWidth={w} cx="196" cy="144" r="6"/>
      <line strokeWidth={w} x1="116" y1="112" x2="164" y2="112"/>
      <path strokeWidth={w} d="M154 105 L164 112 L154 119"/>
      <rect strokeWidth={w} x="114" y="34" width="52" height="64" rx="4"/>
      <line strokeWidth={l} x1="124" y1="50" x2="156" y2="50" opacity="0.6"/>
      <line strokeWidth={l} x1="124" y1="62" x2="156" y2="62" opacity="0.6"/>
      <line strokeWidth={l} x1="124" y1="74" x2="146" y2="74" opacity="0.6"/>
      <path strokeWidth={w} d="M128 86 L140 78 L152 86"/>
    </svg>
  );

  if (id === 'ferdi-kaza') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <circle strokeWidth={w} cx="100" cy="42" r="20"/>
      <path strokeWidth={w} d="M100 62 L100 118 M72 80 L100 72 L128 80 M100 118 L82 164 M100 118 L118 164"/>
      <path strokeWidth={w} d="M158 54 L180 63 L180 93 C180 109 169 115 169 117 C169 115 158 109 158 93 Z"/>
      <path strokeWidth={w} d="M163 85 L167 90 L175 77"/>
      <rect strokeWidth={w} x="210" y="32" width="48" height="14" rx="3"/>
      <rect strokeWidth={w} x="221" y="18" width="14" height="42" rx="3"/>
      <line strokeWidth={l} x1="20" y1="180" x2="260" y2="180" opacity="0.2"/>
    </svg>
  );

  if (id === 'hayat-sigortasi') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <path strokeWidth={w} d="M140 180 C72 138 30 106 30 70 C30 50 46 34 70 34 C90 34 108 48 140 68 C172 48 190 34 210 34 C234 34 250 50 250 70 C250 106 208 138 140 180 Z"/>
      <path strokeWidth={w} d="M54 96 L84 96 L95 68 L111 126 L126 76 L137 96 L226 96"/>
      <circle strokeWidth={w} cx="112" cy="152" r="10"/>
      <circle strokeWidth={w} cx="140" cy="152" r="10"/>
      <circle strokeWidth={w} cx="168" cy="152" r="10"/>
    </svg>
  );

  if (id === 'konut-isyeri-sigortasi') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <path strokeWidth={w} d="M28 188 V100 L140 24 L252 100 V188 Z"/>
      <path strokeWidth={w} d="M8 108 L140 12 L272 108"/>
      <path strokeWidth={w} d="M116 188 V148 C116 142 120 138 126 138 H154 C160 138 164 142 164 148 V188"/>
      <rect strokeWidth={w} x="54" y="114" width="42" height="36" rx="2"/>
      <line strokeWidth={l} x1="75" y1="114" x2="75" y2="150" opacity="0.5"/>
      <line strokeWidth={l} x1="54" y1="132" x2="96" y2="132" opacity="0.5"/>
      <rect strokeWidth={w} x="184" y="114" width="42" height="36" rx="2"/>
      <line strokeWidth={l} x1="205" y1="114" x2="205" y2="150" opacity="0.5"/>
      <line strokeWidth={l} x1="184" y1="132" x2="226" y2="132" opacity="0.5"/>
      <path strokeWidth={w} d="M234 24 L256 33 L256 58 C256 72 245 78 245 80 C245 78 234 72 234 58 Z"/>
      <path strokeWidth={w} d="M239 52 L243 57 L250 44"/>
    </svg>
  );

  if (id === 'konut-isyeri-sigortasi-isyeri') return ( // unused fallback
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <rect strokeWidth={w} x="36" y="42" width="164" height="146" rx="3"/>
      <line strokeWidth={l} x1="36" y1="68" x2="200" y2="68" opacity="0.4"/>
      <rect strokeWidth="1.2" x="52" y="80" width="28" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth="1.2" x="90" y="80" width="28" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth="1.2" x="128" y="80" width="28" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth="1.2" x="166" y="80" width="22" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth="1.2" x="52" y="114" width="28" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth="1.2" x="90" y="114" width="28" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth="1.2" x="128" y="114" width="28" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth="1.2" x="166" y="114" width="22" height="22" rx="2" opacity="0.7"/>
      <rect strokeWidth={w} x="106" y="152" width="26" height="36" rx="2"/>
      <path strokeWidth={w} d="M228 28 L250 37 L250 58 C250 70 239 76 239 78 C239 76 228 70 228 58 Z"/>
      <rect strokeWidth={w} x="231" y="56" width="16" height="12" rx="2"/>
      <path strokeWidth={w} d="M234 56 V49 C234 45 244 45 244 49 V56"/>
    </svg>
  );

  if (id === 'dask') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <path strokeWidth={w} d="M58 170 V102 L140 44 L222 102 V170 Z"/>
      <path strokeWidth={w} d="M40 110 L140 34 L240 110"/>
      <path strokeWidth={w} d="M120 170 V142 C120 136 124 132 130 132 H150 C156 132 160 136 160 142 V170"/>
      <path strokeWidth={w} d="M0 178 C18 170 24 186 42 178 C60 170 66 186 84 178 C102 170 108 186 126 178 C144 170 150 186 168 178 C186 170 192 186 210 178 C228 170 234 186 252 178 C266 172 272 174 280 178"/>
      <path strokeWidth={l} d="M0 190 C18 182 24 198 42 190 C60 182 66 198 84 190 C102 182 108 198 126 190 C144 182 150 198 168 190 C186 182 192 198 210 190 C228 182 234 198 252 190" opacity="0.4"/>
      <path strokeWidth={l} d="M118 102 L112 118 L120 130 M160 102 L166 116 L158 128" opacity="0.45"/>
    </svg>
  );

  if (id === 'saglik-sigortasi') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <path strokeWidth={w} d="M62 20 C62 20 50 20 44 32 L44 86 C44 108 62 122 80 122 C98 122 116 108 116 86 V70"/>
      <line strokeWidth={w} x1="62" y1="20" x2="82" y2="20"/>
      <circle strokeWidth={w} cx="82" cy="20" r="6"/>
      <circle strokeWidth={w} cx="62" cy="20" r="6"/>
      <circle strokeWidth="2" cx="116" cy="60" r="20"/>
      <line strokeWidth={w} x1="116" y1="50" x2="116" y2="70" opacity="0.6"/>
      <line strokeWidth={w} x1="106" y1="60" x2="126" y2="60" opacity="0.6"/>
      <rect strokeWidth={w} x="178" y="28" width="56" height="18" rx="3"/>
      <rect strokeWidth={w} x="190" y="14" width="18" height="46" rx="3"/>
      <path strokeWidth={w} d="M0 162 H58 L76 132 L94 190 L110 150 L124 162 H280"/>
    </svg>
  );

  if (id === 'bireysel-emeklilik') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <line strokeWidth={l} x1="28" y1="18" x2="28" y2="172" opacity="0.4"/>
      <line strokeWidth={l} x1="28" y1="172" x2="262" y2="172" opacity="0.4"/>
      <rect strokeWidth={w} x="48" y="130" width="30" height="42" rx="2" opacity="0.65"/>
      <rect strokeWidth={w} x="92" y="110" width="30" height="62" rx="2" opacity="0.75"/>
      <rect strokeWidth={w} x="136" y="84" width="30" height="88" rx="2" opacity="0.85"/>
      <rect strokeWidth={w} x="180" y="54" width="30" height="118" rx="2"/>
      <path strokeWidth={w} d="M48 128 L107 106 L151 80 L215 52"/>
      <line strokeWidth={w} x1="222" y1="32" x2="222" y2="52"/>
      <path strokeWidth={w} d="M214 42 L222 32 L230 42"/>
      <ellipse strokeWidth={w} cx="244" cy="154" rx="22" ry="7"/>
      <ellipse strokeWidth={w} cx="244" cy="146" rx="22" ry="7"/>
      <ellipse strokeWidth={w} cx="244" cy="138" rx="22" ry="7"/>
      <line strokeWidth={l} x1="222" y1="154" x2="222" y2="138" opacity="0.5"/>
      <line strokeWidth={l} x1="266" y1="154" x2="266" y2="138" opacity="0.5"/>
    </svg>
  );

  if (id === 'seyahat-sigortasi') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <circle strokeWidth={w} cx="108" cy="108" r="80"/>
      <path strokeWidth={l} d="M28 88 Q108 78 188 88" opacity="0.4"/>
      <path strokeWidth={l} d="M30 108 Q108 98 186 108" opacity="0.4"/>
      <path strokeWidth={l} d="M28 128 Q108 118 188 128" opacity="0.4"/>
      <path strokeWidth={l} d="M108 28 C92 58 92 158 108 188" opacity="0.4"/>
      <path strokeWidth={l} d="M108 28 C124 58 124 158 108 188" opacity="0.4"/>
      <path strokeWidth={w} d="M208 46 L256 34 L248 52 L228 52 L218 66 L204 62 Z"/>
      <path strokeWidth={w} d="M228 52 L236 62 L228 64"/>
      <path strokeWidth={w} d="M218 66 L222 72 L216 72"/>
      <path strokeWidth={w} d="M186 88 C206 78 228 60 244 48" strokeDasharray="4 4" opacity="0.5"/>
    </svg>
  );

  if (id === 'nakliyat-sigortasi') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <path strokeWidth={w} d="M0 164 C18 156 36 172 54 164 C72 156 90 172 108 164 C126 156 144 172 162 164 C180 156 198 172 216 164 C234 156 252 172 270 164 C274 162 277 162 280 164"/>
      <path strokeWidth={l} d="M0 178 C18 170 36 186 54 178 C72 170 90 186 108 178 C126 170 144 186 162 178 C180 170 198 186 216 178 C234 170 252 186 270 178" opacity="0.4"/>
      <path strokeWidth={w} d="M18 154 L28 118 H252 L262 154 C262 160 257 164 250 164 H30 C23 164 18 160 18 154 Z"/>
      <line strokeWidth={l} x1="28" y1="118" x2="252" y2="118" opacity="0.4"/>
      <rect strokeWidth={w} x="46" y="90" width="52" height="28" rx="2"/>
      <rect strokeWidth={w} x="106" y="90" width="52" height="28" rx="2"/>
      <rect strokeWidth={w} x="166" y="90" width="52" height="28" rx="2"/>
      <line strokeWidth={l} x1="72" y1="90" x2="72" y2="118" opacity="0.5"/>
      <line strokeWidth={l} x1="132" y1="90" x2="132" y2="118" opacity="0.5"/>
      <line strokeWidth={l} x1="192" y1="90" x2="192" y2="118" opacity="0.5"/>
      <line strokeWidth={w} x1="140" y1="118" x2="140" y2="54"/>
      <line strokeWidth={w} x1="140" y1="54" x2="184" y2="70"/>
      <line strokeWidth={l} x1="184" y1="70" x2="184" y2="90" strokeDasharray="3 3" opacity="0.5"/>
    </svg>
  );

  if (id === 'kurumsal-endustriyel') return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <rect strokeWidth={w} x="8" y="78" width="152" height="110" rx="2"/>
      <path strokeWidth={w} d="M8 78 L28 48 L48 78 L68 48 L88 78 L108 48 L128 78 L148 48 L160 78"/>
      <rect strokeWidth={w} x="166" y="38" width="16" height="52" rx="1"/>
      <rect strokeWidth={w} x="200" y="48" width="16" height="42" rx="1"/>
      <path strokeWidth="1.2" d="M174 38 C168 26 178 16 172 6" opacity="0.4"/>
      <path strokeWidth="1.2" d="M208 48 C202 36 212 26 206 16" opacity="0.4"/>
      <rect strokeWidth="1.2" x="20" y="94" width="24" height="20" rx="1" opacity="0.7"/>
      <rect strokeWidth="1.2" x="54" y="94" width="24" height="20" rx="1" opacity="0.7"/>
      <rect strokeWidth="1.2" x="88" y="94" width="24" height="20" rx="1" opacity="0.7"/>
      <rect strokeWidth="1.2" x="122" y="94" width="24" height="20" rx="1" opacity="0.7"/>
      <rect strokeWidth={w} x="58" y="148" width="28" height="40" rx="2"/>
      <circle strokeWidth={w} cx="232" cy="138" r="36"/>
      <circle strokeWidth={w} cx="232" cy="138" r="18"/>
      <rect strokeWidth="1.2" x="224" y="98" width="16" height="12" rx="2"/>
      <rect strokeWidth="1.2" x="224" y="166" width="16" height="12" rx="2"/>
      <rect strokeWidth="1.2" x="192" y="130" width="12" height="16" rx="2"/>
      <rect strokeWidth="1.2" x="260" y="130" width="12" height="16" rx="2"/>
    </svg>
  );

  return (
    <svg {...c} viewBox="0 0 280 200" style={st}>
      <path strokeWidth={w} d="M140 20 L168 80 L240 80 L182 120 L204 182 L140 142 L76 182 L98 120 L40 80 L112 80 Z"/>
    </svg>
  );
}

export function ProductDetail({ id, go }) {
  const base = PRODUCTS.find(x => x.id === id);
  const [dbData, setDbData] = useState(null);
  useEffect(() => {
    supabase.from('products').select('*').eq('id', id).single()
      .then(({ data }) => { if (data) setDbData(data); });
  }, [id]);
  if (!base) return <NotFound go={go} />;
  const p = { ...base, ...(dbData || {}) };
  const title = p.title || base.title;
  const kicker = p.kicker || base.kicker;
  const desc = p.desc_short || p.desc;
  const rawHtml = p.body_html || '';
  const bodyHtml = rawHtml.replace(/<[^>]*>/g, '').trim() ? rawHtml : null;
  // Only show static body if there's NO DB record at all — once admin saves, static fallback disabled
  const bodyArr = (!bodyHtml && !dbData && base?.body?.length) ? base.body : null;
  return (
    <div className="page-enter">
      <PageHeader kicker={kicker} title={title} breadcrumb={`Ana Sayfa / Ürünler / ${title}`} />

      {/* Visual banner */}
      <section style={{ padding: '8px 0 0' }}>
        <div className="container">
          <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
            <div className="mob-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 280 }}>
              <div style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary-50) 0%, #fff 100%)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px', borderRadius: 9999, background: 'var(--primary)', color: '#fff', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em', alignSelf: 'flex-start', marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.75 }}>{p.idx}</span>
                  <span style={{ opacity: 0.35 }}>|</span>
                  {kicker}
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-2)', margin: 0, maxWidth: 420 }} dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
              <div style={{ background: 'var(--slate-50)', display: 'grid', placeItems: 'center', padding: 40, borderLeft: '1px solid var(--border)' }}>
                {p.image_url
                  ? <img src={p.image_url} alt={title} style={{ width: '100%', maxWidth: 260, height: 'auto', objectFit: 'contain' }} />
                  : <ProductIllust id={base.id} />
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {(bodyHtml || bodyArr) && (
        <section className="section" style={{ padding: '48px 0 0' }}>
          <div className="container">
            <div className="card" style={{ padding: '36px 40px' }}>
              {bodyHtml
                ? <div style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text-2)' }} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                : bodyArr.map((para, i) => (
                    <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text-2)', margin: i === 0 ? 0 : '14px 0 0' }}>{para}</p>
                  ))
              }
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ padding: '48px 0' }}>
        <div className="container">
          <div className="mob-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div style={{ paddingTop: 8 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 9999, background: 'var(--primary-50)', color: 'var(--primary)', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 20 }}>
                {p.idx} — {p.kicker}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, margin: '0 0 16px', color: 'var(--text)' }}>{p.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-2)', margin: 0 }}>Bize ulaşın, sizi arayalım, ziyaret edelim.</p>
            </div>
            <div className="card" style={{ padding: 32 }}>
              <ProductContactForm productTitle={p.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
