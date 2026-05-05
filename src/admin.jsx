import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase.js';
import { PRODUCTS } from './data.jsx';
import { ProductIllust } from './pages-products.jsx';

const ADMIN_PASS = 'aol2025';

const slugify = (str) => str
  .toLowerCase()
  .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s')
  .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ─── Rich text editor ───────────────────────────────────── */
function RichEditor({ value, onChange }) {
  const ref = useRef(null);
  const initialized = useRef(false);
  useEffect(() => {
    if (ref.current && !initialized.current) {
      ref.current.innerHTML = value || '';
      initialized.current = true;
    }
  }, []);
  const cmd = (command, val = null) => {
    ref.current.focus();
    document.execCommand(command, false, val);
    onChange(ref.current.innerHTML);
  };
  const btn = (label, action) => (
    <button type="button" onMouseDown={e => { e.preventDefault(); action(); }}
      style={{ padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 6, background: '#fff', color: 'var(--text)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
      {label}
    </button>
  );
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 4, padding: '8px 10px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
        {btn(<b>B</b>, () => cmd('bold'))}
        {btn(<i>I</i>, () => cmd('italic'))}
        {btn(<u>U</u>, () => cmd('underline'))}
        <div style={{ width: 1, background: 'var(--border)', margin: '0 2px' }} />
        {btn('• Liste', () => cmd('insertUnorderedList'))}
        {btn('1. Liste', () => cmd('insertOrderedList'))}
        <div style={{ width: 1, background: 'var(--border)', margin: '0 2px' }} />
        {btn('Başlık', () => cmd('formatBlock', 'h3'))}
        {btn('Paragraf', () => cmd('formatBlock', 'p'))}
        <div style={{ width: 1, background: 'var(--border)', margin: '0 2px' }} />
        {btn('Temizle', () => cmd('removeFormat'))}
      </div>
      <div ref={ref} contentEditable suppressContentEditableWarning
        onInput={e => onChange(e.currentTarget.innerHTML)}
        onPaste={e => {
          e.preventDefault();
          const html = e.clipboardData.getData('text/html');
          let text;
          if (html) {
            const tmp = document.createElement('div');
            tmp.innerHTML = html;
            text = tmp.innerText;
          } else {
            text = e.clipboardData.getData('text/plain');
          }
          // PDFs with bad Turkish font encoding map the 'i' glyph to '&' char code
          text = text.replace(/&(?![a-zA-Z#]\w{0,7};)/g, 'i');
          // Some PDFs map 'i' to '(' — detect by counting '(' embedded in words
          const badParens = (text.match(/[a-zA-ZğüşıöçĞÜŞİÖÇ]\([a-zA-ZğüşıöçĞÜŞİÖÇ]/g) || []).length;
          if (badParens > 2) {
            text = text.replace(/(?<=[a-zA-ZğüşıöçĞÜŞİÖÇ])\((?=[a-zA-ZğüşıöçĞÜŞİÖÇ])/g, 'i');
            text = text.replace(/(?<=[a-zA-ZğüşıöçĞÜŞİÖÇ])\((?=[\s.,;:!?\n]|$)/gm, 'i');
            text = text.replace(/(?<=^|\s)\((?=[a-zA-ZğüşıöçĞÜŞİÖÇ])/gm, 'i');
          }
          // Some PDFs map 'i' to "'" (apostrophe) — detect by lowercase pairs
          const badApos = (text.match(/[a-zğüşöç]'[a-zğüşöç]/g) || []).length;
          if (badApos > 2) {
            text = text.replace(/(?<=[a-zA-ZğüşıöçĞÜŞİÖÇ])'(?=[a-zğüşıöç])/g, 'i');
            text = text.replace(/(?<=[a-zğüşıöç])'(?=[\s.,;:!?\n()\[\]]|$)/gm, 'i');
            text = text.replace(/(?<=^|\s)'(?=[a-zğüşıöç])/gm, 'i');
          }
          const sel = window.getSelection();
          if (!sel.rangeCount) return;
          const range = sel.getRangeAt(0);
          range.deleteContents();
          const node = document.createTextNode(text);
          range.insertNode(node);
          range.setStartAfter(node);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          onChange(ref.current.innerHTML);
        }}
        style={{ minHeight: 200, padding: '16px 18px', fontSize: 14, lineHeight: 1.7, outline: 'none' }} />
    </div>
  );
}

/* ─── Image upload ───────────────────────────────────────── */
function ImageUpload({ productId, currentUrl, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const upload = async (file) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${productId}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file, { upsert: true });
    if (error) { alert('Yükleme hatası: ' + error.message); setUploading(false); return; }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    setPreview(data.publicUrl);
    onUploaded(data.publicUrl);
    setUploading(false);
  };
  return (
    <div>
      <div style={{ marginBottom: 12, borderRadius: 10, overflow: 'hidden', background: 'var(--slate-50)', border: '1px solid var(--border)', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {preview ? <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          : <div style={{ color: 'var(--text-2)', fontSize: 13 }}>Görsel yok — SVG kullanılacak</div>}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <label style={{ flex: 1 }}>
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files[0] && upload(e.target.files[0])} />
          <div className="btn btn-secondary" style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>
            {uploading ? 'Yükleniyor…' : 'Görsel Yükle'}
          </div>
        </label>
        {preview && <button type="button" className="btn btn-secondary" style={{ color: 'var(--primary)' }} onClick={() => { setPreview(null); onUploaded(null); }}>Kaldır</button>}
      </div>
    </div>
  );
}

/* ─── Product editor ─────────────────────────────────────── */
function ProductEditor({ product, isNew, onSaved, onCancel }) {
  const [form, setForm] = useState({
    title: product.title || '',
    kicker: product.kicker || '',
    desc_short: product.desc_short || product.desc || '',
    body_html: product.body_html || (product.body ? product.body.map(p => `<p>${p}</p>`).join('') : ''),
    image_url: product.image_url || null,
    seo_title: product.seo_title || '',
    seo_desc: product.seo_desc || '',
    seo_keywords: product.seo_keywords || '',
  });
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('content');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) { alert('Ürün adı zorunlu.'); return; }
    setSaving(true);
    const id = isNew ? slugify(form.title) : product.id;
    const idx = isNew ? (product.idx || String(Date.now()).slice(-4)) : product.idx;
    const { error } = await supabase.from('products').upsert({
      id, idx, is_custom: isNew ? true : (product.is_custom || false),
      hidden: false, ...form, updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });
    setSaving(false);
    if (error) { alert('Kayıt hatası: ' + error.message); return; }
    onSaved({ id, idx, is_custom: isNew, hidden: false, ...form });
  };

  const ip = { padding: '10px 13px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' };
  const tabBtn = (t, label) => (
    <button type="button" onClick={() => setTab(t)} style={{
      padding: '8px 20px', border: 'none', borderBottom: tab === t ? '2px solid var(--primary)' : '2px solid transparent',
      background: 'none', fontSize: 14, fontWeight: tab === t ? 700 : 500,
      color: tab === t ? 'var(--primary)' : 'var(--text-2)', cursor: 'pointer',
    }}>{label}</button>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <button type="button" onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', fontSize: 13 }}>← Geri</button>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, flex: 1 }}>
          {isNew ? 'Yeni Ürün' : `${product.idx} — ${form.title || product.title}`}
        </h2>
        <button type="button" className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
        {tabBtn('content', 'İçerik')}
        {tabBtn('image', 'Görsel')}
        {tabBtn('seo', 'SEO')}
      </div>

      {tab === 'content' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Ürün Adı *</span>
            <input style={ip} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Kasko Sigortası" />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Alt Başlık <span style={{ color: 'var(--text-2)', fontWeight: 400 }}>— ürün detay sayfasında başlığın altında çıkar</span></span>
            <input style={ip} value={form.kicker} onChange={e => set('kicker', e.target.value)} placeholder="Aracınız için tam koruma" />
          </label>
          <div style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Kart Açıklaması <span style={{ color: 'var(--text-2)', fontWeight: 400 }}>— ana sayfada ürün kartında gösterilir</span></span>
            <RichEditor value={form.desc_short} onChange={v => set('desc_short', v)} />
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Sayfa İçeriği <span style={{ color: 'var(--text-2)', fontWeight: 400 }}>— ürün detay sayfasının tam içeriği</span></span>
            <RichEditor value={form.body_html} onChange={v => set('body_html', v)} />
          </div>
        </div>
      )}

      {tab === 'image' && (
        <div style={{ maxWidth: 400 }}>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 0 }}>Görsel yoksa SVG illüstrasyon otomatik gösterilir.</p>
          <ImageUpload productId={isNew ? slugify(form.title || 'urun') : product.id} currentUrl={form.image_url} onUploaded={url => set('image_url', url)} />
          {!isNew && (
            <div style={{ marginTop: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>SVG Fallback</span>
              <div style={{ marginTop: 10, background: 'var(--slate-50)', borderRadius: 10, padding: 24, display: 'flex', justifyContent: 'center', border: '1px solid var(--border)' }}>
                <ProductIllust id={product.id} />
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'seo' && (
        <div style={{ display: 'grid', gap: 20, maxWidth: 640 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>SEO Başlığı</span>
            <input style={ip} value={form.seo_title} onChange={e => set('seo_title', e.target.value)} placeholder={`${form.title} | AOL Sigorta`} />
            <span style={{ fontSize: 12, color: form.seo_title.length > 60 ? 'var(--primary)' : 'var(--text-2)' }}>{form.seo_title.length}/60</span>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Meta Açıklama</span>
            <textarea style={{ ...ip, resize: 'vertical', minHeight: 80 }} value={form.seo_desc} onChange={e => set('seo_desc', e.target.value)} placeholder="Arama motorlarında görünecek metin…" />
            <span style={{ fontSize: 12, color: form.seo_desc.length > 160 ? 'var(--primary)' : 'var(--text-2)' }}>{form.seo_desc.length}/160</span>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Anahtar Kelimeler <span style={{ color: 'var(--text-2)', fontWeight: 400 }}>(virgülle ayırın)</span></span>
            <input style={ip} value={form.seo_keywords} onChange={e => set('seo_keywords', e.target.value)} placeholder="kasko sigortası, araç sigortası" />
          </label>
          <div style={{ padding: 16, background: 'var(--slate-50)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8, fontWeight: 600 }}>GOOGLE ÖNİZLEME</div>
            <div style={{ fontSize: 17, color: '#1a0dab', marginBottom: 4 }}>{form.seo_title || `${form.title} | AOL Sigorta`}</div>
            <div style={{ fontSize: 13, color: '#006621', marginBottom: 4 }}>aol.gen.tr/urunler/{isNew ? slugify(form.title || 'urun') : product.id}</div>
            <div style={{ fontSize: 13, color: '#545454', lineHeight: 1.5 }}>{form.seo_desc || form.desc_short || '—'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Product list ───────────────────────────────────────── */
function ProductList({ dbProducts, onEdit, onDelete, onNew }) {
  const [search, setSearch] = useState('');

  const staticList = PRODUCTS.map(p => ({ ...p, ...(dbProducts[p.id] || {}) }));
  const customList = Object.values(dbProducts).filter(p => p.is_custom && !PRODUCTS.find(s => s.id === p.id));
  const seen = new Set();
  const all = [...staticList, ...customList]
    .filter(p => !p.hidden)
    .filter(p => { if (seen.has(p.id)) return false; seen.add(p.id); return true; });
  const filtered = search
    ? all.filter(p => (p.title || '').toLowerCase().includes(search.toLowerCase()) || (p.kicker || '').toLowerCase().includes(search.toLowerCase()))
    : all;

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, flex: 1 }}>Ürünler <span style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 400 }}>({filtered.length})</span></h2>
        <button className="btn btn-primary" onClick={onNew}>+ Yeni Ürün</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Ürün ara…"
          style={{ padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }}
        />
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-2)' }}>Sonuç bulunamadı.</div>
      )}

      <div style={{ display: 'grid', gap: 6 }}>
        {filtered.map(p => (
          <div key={p.id} className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>
              {p.idx || '—'}
            </div>
            {p.image_url
              ? <img src={p.image_url} alt="" style={{ width: 44, height: 32, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
              : <div style={{ width: 44, height: 32, background: 'var(--slate-50)', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, color: 'var(--text-2)' }}>SVG</span>
                </div>
            }
            <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => onEdit(p)}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.kicker}</div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {p.is_custom && <span style={{ fontSize: 11, padding: '2px 8px', background: 'var(--primary-50)', color: 'var(--primary)', borderRadius: 999, fontWeight: 600 }}>Özel</span>}
              <span style={{ fontSize: 11, color: dbProducts[p.id] ? 'var(--primary)' : 'var(--text-2)', fontWeight: 600 }}>
                {dbProducts[p.id] ? '● Düzenlendi' : '○ Varsayılan'}
              </span>
              <button onClick={() => onEdit(p)} style={{ padding: '5px 12px', border: '1px solid var(--border)', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 12 }}>Düzenle</button>
              <button onClick={() => onDelete(p)} style={{ padding: '5px 12px', border: '1px solid #fecaca', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 12, color: '#dc2626' }}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Login ──────────────────────────────────────────────── */
function Login({ onLogin }) {
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) onLogin();
    else { setErr(true); setPass(''); }
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--slate-50)' }}>
      <div className="card" style={{ padding: 40, width: 360 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800 }}>AOL Admin</h1>
        <p style={{ margin: '0 0 28px', fontSize: 14, color: 'var(--text-2)' }}>Yönetim paneline erişmek için şifrenizi girin.</p>
        <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
          <input type="password" value={pass} onChange={e => { setPass(e.target.value); setErr(false); }} placeholder="Şifre"
            style={{ padding: '11px 14px', border: `1px solid ${err ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 8, fontSize: 14, outline: 'none' }} autoFocus />
          {err && <span style={{ fontSize: 12, color: 'var(--primary)' }}>Hatalı şifre.</span>}
          <button className="btn btn-primary" type="submit">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
}

/* ─── Admin root ─────────────────────────────────────────── */
export function AdminPanel({ go }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('aol-admin') === '1');
  const [dbProducts, setDbProducts] = useState({});
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authed) return;
    supabase.from('products').select('*').then(({ data, error }) => {
      if (error) alert('Supabase hatası: ' + error.message + '\n\nsupabase-schema.sql dosyasını SQL Editor\'da çalıştırın.');
      if (data) setDbProducts(Object.fromEntries(data.map(p => [p.id, p])));
      setLoading(false);
    });
  }, [authed]);

  const login = () => { sessionStorage.setItem('aol-admin', '1'); setAuthed(true); };

  const handleDelete = async (p) => {
    if (!confirm(`"${p.title}" silinsin mi?`)) return;
    if (p.is_custom) {
      await supabase.from('products').delete().eq('id', p.id);
      setDbProducts(d => { const next = { ...d }; delete next[p.id]; return next; });
    } else {
      await supabase.from('products').upsert({ ...p, hidden: true, updated_at: new Date().toISOString() });
      setDbProducts(d => ({ ...d, [p.id]: { ...p, hidden: true } }));
    }
  };

  const handleSaved = (updated) => {
    setDbProducts(d => ({ ...d, [updated.id]: updated }));
    setEditing(null);
    setIsNew(false);
  };

  const handleNew = () => {
    setEditing({ id: '', idx: '', title: '', kicker: '', desc_short: '', body_html: '', image_url: null, seo_title: '', seo_desc: '', seo_keywords: '' });
    setIsNew(true);
  };

  if (!authed) return <Login onLogin={login} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-50)' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 800, fontSize: 16 }}>AOL Admin</span>
          <span style={{ color: 'var(--border)' }}>|</span>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Ürün Yönetimi</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" style={{ fontSize: 13 }} onClick={() => go('/')}>Siteye Dön</button>
          <button className="btn btn-secondary" style={{ fontSize: 13, color: 'var(--primary)' }}
            onClick={() => { sessionStorage.removeItem('aol-admin'); setAuthed(false); }}>Çıkış</button>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '40px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-2)' }}>Yükleniyor…</div>
        ) : editing ? (
          <ProductEditor
            product={editing}
            isNew={isNew}
            onSaved={handleSaved}
            onCancel={() => { setEditing(null); setIsNew(false); }}
          />
        ) : (
          <ProductList
            dbProducts={dbProducts}
            onEdit={p => { setEditing(p); setIsNew(false); }}
            onDelete={handleDelete}
            onNew={handleNew}
          />
        )}
      </div>
    </div>
  );
}
