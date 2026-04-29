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
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <AolLogo height={64} mono />
            <p style={{ marginTop: 20, maxWidth: 340, color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.65 }}>
              Artı Oluşum Sigorta Aracılık Hizmetleri Ltd. Şti. 22 sigorta şirketinin yetkili acentesi olarak 30 yıla yakın deneyimle yanınızdayız.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={() => go('/teklif-al')}>Teklif Al <IconArrow size={12} /></button>
              <a className="btn btn-ghost" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} href={`tel:${COMPANY.hq.phone.replace(/\s/g,'')}`}>Bizi Arayın</a>
            </div>
          </div>
          <div>
            <div className="mono-tag" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Keşfet</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
              {NAV.map(n => (
                <li key={n.id}><a href={n.path} onClick={e => { e.preventDefault(); go(n.path); }}>{n.label}</a></li>
              ))}
              <li><a href="/teklif-al" onClick={e => { e.preventDefault(); go('/teklif-al'); }}>Teklif Al</a></li>
            </ul>
          </div>
          <div>
            <div className="mono-tag" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Ankara · Merkez</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#fff' }}>{COMPANY.hq.addr}</p>
            <p style={{ margin: '12px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{COMPANY.hq.phone}</p>
            <div className="mono-tag" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 24, marginBottom: 16 }}>Denizli · Şube</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#fff' }}>{COMPANY.branch.addr}</p>
            <p style={{ margin: '12px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{COMPANY.branch.phone}</p>
          </div>
          <div>
            <div className="mono-tag" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>İletişim</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 14 }}>
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li style={{ color: 'rgba(255,255,255,0.6)' }}>Teklif: <a href={`mailto:${COMPANY.quoteEmail}`}>{COMPANY.quoteEmail}</a></li>
            </ul>
            <div className="mono-tag" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 24, marginBottom: 16 }}>Çalışma Saatleri</div>
            <p style={{ margin: 0, fontSize: 14, color: '#fff' }}>{COMPANY.hours}</p>
          </div>
        </div>
        <div style={{ height: 48 }} />
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
          <span>© {new Date().getFullYear()} Artı Oluşum Sigorta · Tüm hakları saklıdır</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#">Gizlilik Politikası</a>
            <a href="#">KVKK</a>
            <a href="#">Çerez Tercihleri</a>
          </div>
        </div>
      </div>
    </footer>
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
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
