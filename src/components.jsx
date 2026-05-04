import { useState, useEffect } from 'react';
import { COMPANY, STATS, NAV } from './data.jsx';
import { AolLogo } from './logo.jsx';
import { IconArrow } from './icons.jsx';
import { TWEAKS } from './tweaks.js';

/* ---------- Footer ---------- */
export function Footer({ go }) {
  return (
    <footer>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <AolLogo height={80} />
            <p style={{ marginTop: 20, maxWidth: 340, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.65 }}>
              Artı Oluşum Sigorta Aracılık Hizmetleri Ltd. Şti. 22 sigorta şirketinin yetkili acentesi olarak 30 yıla yakın deneyimle yanınızdayız.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={() => go('/teklif-al')}>Teklif Al <IconArrow size={12} /></button>
              <a className="btn btn-secondary" href={`tel:${COMPANY.hq.phone.replace(/\s/g,'')}`}>Bizi Arayın</a>
            </div>
          </div>
          <div>
            <div className="mono-tag" style={{ marginBottom: 16 }}>Keşfet</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
              {NAV.map(n => (
                <li key={n.id}><a href={n.path} onClick={e => { e.preventDefault(); go(n.path); }}>{n.label}</a></li>
              ))}
              <li><a href="/teklif-al" onClick={e => { e.preventDefault(); go('/teklif-al'); }}>Teklif Al</a></li>
            </ul>
          </div>
          <div>
            <div className="mono-tag" style={{ marginBottom: 16 }}>Ankara · Merkez</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--text)' }}>{COMPANY.hq.addr}</p>
            <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--text-2)' }}>{COMPANY.hq.phone}</p>
            <button
              onClick={() => go('/iletisim')}
              style={{ marginTop: 20, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-2)', borderRadius: 'var(--radius)', padding: '8px 16px', fontSize: 13, cursor: 'pointer', letterSpacing: '0.01em' }}
            >
              Tüm Şubeleri Gör →
            </button>
          </div>
          <div>
            <div className="mono-tag" style={{ marginBottom: 16 }}>İletişim</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li style={{ color: 'var(--text-2)' }}>Teklif: <a href={`mailto:${COMPANY.quoteEmail}`}>{COMPANY.quoteEmail}</a></li>
            </ul>
            <div className="mono-tag" style={{ marginTop: 24, marginBottom: 16 }}>Çalışma Saatlerimiz</div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>
              Hafta içi 09:00 – 18:00<br />Cumartesi 09:00 – 14:00
            </p>
          </div>
        </div>
        <div style={{ height: 48 }} />
        <div style={{ height: 1, background: 'var(--border)' }} />
        <div className="mob-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, gap: 12, fontSize: 13, color: 'var(--text-2)' }}>
          <span>© {new Date().getFullYear()} Artı Oluşum Sigorta · Tüm hakları saklıdır</span>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <a href="/gizlilik" onClick={e => { e.preventDefault(); go('/gizlilik'); }}>Gizlilik</a>
            <a href="/kvkk" onClick={e => { e.preventDefault(); go('/kvkk'); }}>KVKK</a>
            <a href="/cerez" onClick={e => { e.preventDefault(); go('/cerez'); }}>Çerez</a>
          </div>
        </div>
        <div style={{ paddingTop: 16, textAlign: 'center' }}>
          <a href="https://muimedya.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--slate-300)', letterSpacing: '0.08em', textDecoration: 'none' }}>created by muimedya</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Cookie Consent ---------- */
export function CookieConsent({ go }) {
  const [visible, setVisible] = useState(() => !localStorage.getItem('aol-cookies'));

  const accept = () => {
    localStorage.setItem('aol-cookies', '1');
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, width: 'min(680px, calc(100vw - 32px))',
      background: '#fff', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
      border: '1px solid var(--border)', padding: '20px 24px',
      display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Bu site çerez kullanmaktadır.</div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: 0, lineHeight: 1.5 }}>
          Deneyiminizi geliştirmek ve hizmetlerimizi sunmak için çerezler kullanılmaktadır.{' '}
          <a href="/cerez" onClick={e => { e.preventDefault(); go('/cerez'); accept(); }} style={{ color: 'var(--primary)', fontWeight: 500 }}>Çerez Politikası</a>
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button className="btn btn-secondary btn-sm" onClick={() => { go('/cerez'); accept(); }}>Tercihler</button>
        <button className="btn btn-primary btn-sm" onClick={accept}>Kabul Et</button>
      </div>
    </div>
  );
}

/* ---------- Section pieces reused by inner pages ---------- */
export function SectionLabel({ idx, children }) {
  return (
    <div className="eyebrow">
      {idx && <span style={{ fontFamily: 'var(--font)', fontWeight: 600 }}>{idx}</span>}
      <span style={{ width: 16, height: 1, background: 'var(--primary)' }} />
      <span style={{ color: 'var(--primary)' }}>{children}</span>
    </div>
  );
}

export function Stripes({ label, aspect = '4 / 5', dark = false, tall = false }) {
  return (
    <div className="stripe-holder" style={{
      position: 'relative', width: '100%',
      aspectRatio: tall ? 'auto' : aspect,
      height: tall ? '100%' : 'auto',
      background: dark ? 'linear-gradient(135deg, var(--slate-900), var(--slate-800))' : 'linear-gradient(135deg, var(--primary-50), #fff)',
      border: '1px solid ' + (dark ? 'rgba(255,255,255,0.15)' : 'var(--border)'),
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      display: 'grid', placeItems: 'center',
      color: dark ? 'rgba(255,255,255,0.7)' : 'var(--primary)'
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>{label}</span>
    </div>
  );
}

export function StatRow() {
  return (
    <div className="r4-2 mob-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
      {STATS.map((s, i) => (
        <div key={i} className="card" style={{ padding: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text)' }}>
            {s.n}<span style={{ color: 'var(--primary)' }}>+</span>
          </div>
          <div className="mono-tag" style={{ marginTop: 12, color: 'var(--primary)' }}>{s.s}</div>
          <div style={{ marginTop: 4, fontSize: 14, color: 'var(--text-2)' }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

export function PageHeader({ kicker, title, lead, breadcrumb }) {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 48, background: 'linear-gradient(180deg, var(--slate-50), #fff)' }}>
      <div className="container">
        {breadcrumb && <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 20 }}>{breadcrumb}</div>}
        {kicker && <SectionLabel>{kicker}</SectionLabel>}
        <h1 className="display-1" style={{ margin: '16px 0 0', maxWidth: '16ch' }}>{title}</h1>
        {lead && <p className="lead" style={{ marginTop: 20, maxWidth: 720 }}>{lead}</p>}
      </div>
    </section>
  );
}

export function TweaksPanel() {
  const [on, setOn] = useState(false);
  const [vals, setVals] = useState({ ...TWEAKS });
  useEffect(() => {
    const onMsg = (e) => {
      const m = e.data; if (!m || typeof m !== 'object') return;
      if (m.type === '__activate_edit_mode') setOn(true);
      if (m.type === '__deactivate_edit_mode') setOn(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const set = (k, v) => {
    const next = { ...vals, [k]: v };
    setVals(next);
    Object.assign(TWEAKS, next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
    window.dispatchEvent(new CustomEvent('tweaks-changed'));
  };
  return (
    <div className={'tweaks' + (on ? ' on' : '')}>
      <h4>Tweaks</h4>
      <div className="row2">
        <span>Üst çubuk</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className={vals.showTopBar ? 'on' : ''} onClick={() => set('showTopBar', true)}>Açık</button>
          <button className={!vals.showTopBar ? 'on' : ''} onClick={() => set('showTopBar', false)}>Kapalı</button>
        </div>
      </div>
    </div>
  );
}
