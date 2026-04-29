const { useState: useSm } = React;

function AboutPage({ go }) {
  return (
    <div className="page-enter">
      <PageHeader kicker="Hakkımızda" title={<>30 yıllık yolculuk, <span style={{ color: 'var(--primary)' }}>tek prensip.</span></>}
        lead="Önce müşteri, sonra yönetici, son 20 yıldır bağımsız acente."
        breadcrumb="Ana Sayfa / Hakkımızda" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              ['Doğru eşleştirme', '22 şirketin ürünlerini karşılaştırarak ihtiyacınıza en uygun poliçeyi tespit ediyoruz.'],
              ['Şeffaf teminat', 'Hangi risk teminat altında, hangisi değil — her madde açıkça anlatılır.'],
              ['Hasar takibi', 'Poliçe satışı bittiğinde işimiz başlar; süreç uçtan uca yönetilir.'],
              ['Uzun vadeli ilişki', 'Her yenileme döneminde portföyünüz yeniden optimize edilir.'],
            ].map(([t, d], i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700 }}>0{i+1}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: '16px 0 8px' }}>{t}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AgenciesPage({ go }) {
  return (
    <div className="page-enter">
      <PageHeader kicker="Acentelikler" title={<>22 sigorta şirketinin <span style={{ color: 'var(--primary)' }}>yetkili acentesi.</span></>}
        lead="Türkiye'nin önde gelen ulusal ve uluslararası sigorta şirketleri." breadcrumb="Ana Sayfa / Acentelikler" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {AGENCIES.map((a, i) => (
              <div key={a} className="card card-hover" style={{ padding: 24 }}>
                <div className="mono-tag" style={{ color: 'var(--primary)' }}>{String(i+1).padStart(2,'0')}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginTop: 8 }}>{a}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>Yetkili Acente</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage({ go }) {
  return (
    <div className="page-enter">
      <PageHeader kicker="İletişim" title={<>Bize ulaşın, <span style={{ color: 'var(--primary)' }}>netleşelim.</span></>}
        lead="Ankara merkez ve Denizli şube — her iki lokasyonda da uzman ekibimiz sizi bekliyor."
        breadcrumb="Ana Sayfa / İletişim" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[COMPANY.hq, COMPANY.branch].map((o, i) => (
              <div key={i} className="card" style={{ padding: 32 }}>
                <SectionLabel>{i === 0 ? 'Merkez' : 'Şube'}</SectionLabel>
                <h3 className="display-3" style={{ margin: '12px 0 20px' }}>{o.label.split('—')[0].trim()}</h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <div className="mono-tag" style={{ color: 'var(--text-2)' }}>Adres</div>
                    <div style={{ fontSize: 15, marginTop: 4 }}>{o.addr}</div>
                  </div>
                  <div>
                    <div className="mono-tag" style={{ color: 'var(--text-2)' }}>Telefon</div>
                    <a href={`tel:${o.phone.replace(/\s/g,'')}`} style={{ fontSize: 18, color: 'var(--primary)', fontWeight: 600 }}>{o.phone}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function QuoteFormKasko({ compact = false }) {
  const [s, setS] = useSm({ tc: '', dob: '', job: '', plate: '', docSerial: '', consent: false });
  const [errs, setErrs] = useSm({});
  const [sent, setSent] = useSm(false);
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!/^\d{11}$/.test(s.tc)) er.tc = '11 haneli TC giriniz.';
    if (!s.dob) er.dob = 'Doğum tarihi gerekli.';
    if (!s.job.trim()) er.job = 'Meslek gerekli.';
    if (!s.plate.trim()) er.plate = 'Plaka gerekli.';
    if (!s.docSerial.trim()) er.docSerial = 'Belge seri no gerekli.';
    if (!s.consent) er.consent = 'KVKK onayı gerekli.';
    setErrs(er);
    if (!Object.keys(er).length) setSent(true);
  };
  if (sent) return <QuoteSuccess type="Kasko / Trafik" onReset={() => { setSent(false); setS({ tc: '', dob: '', job: '', plate: '', docSerial: '', consent: false }); }} />;
  const F = ({ label, err, children }) => (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
      {children}
      {err && <span style={{ fontSize: 12, color: 'var(--primary)' }}>{err}</span>}
    </label>
  );
  const ip = { padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, outline: 'none' };
  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="TC No *" err={errs.tc}><input style={ip} maxLength={11} value={s.tc} onChange={e => setS({ ...s, tc: e.target.value.replace(/\D/g, '') })} /></F>
        <F label="Doğum tarihi *" err={errs.dob}><input type="date" style={ip} value={s.dob} onChange={e => setS({ ...s, dob: e.target.value })} /></F>
      </div>
      <F label="Meslek *" err={errs.job}><input style={ip} value={s.job} onChange={e => setS({ ...s, job: e.target.value })} /></F>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Plaka *" err={errs.plate}><input style={ip} placeholder="06 ABC 123" value={s.plate} onChange={e => setS({ ...s, plate: e.target.value.toUpperCase() })} /></F>
        <F label="Belge seri no *" err={errs.docSerial}><input style={ip} value={s.docSerial} onChange={e => setS({ ...s, docSerial: e.target.value.toUpperCase() })} /></F>
      </div>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13 }}>
        <input type="checkbox" checked={s.consent} onChange={e => setS({ ...s, consent: e.target.checked })} />
        KVKK aydınlatma metnini okudum, onaylıyorum.
      </label>
      {errs.consent && <span style={{ fontSize: 12, color: 'var(--primary)' }}>{errs.consent}</span>}
      <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>Teklif Talebi Gönder <IconArrow size={12} /></button>
    </form>
  );
}

function QuoteFormSaglik({ compact = false }) {
  const [parts, setParts] = useSm([{ tc: '', dob: '' }]);
  const [mode, setMode] = useSm('new');
  const [prevC, setPrevC] = useSm('');
  const [consent, setConsent] = useSm(false);
  const [sent, setSent] = useSm(false);
  const [errs, setErrs] = useSm({});
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    parts.forEach((p, i) => { if (!/^\d{11}$/.test(p.tc)) er['tc'+i]='TC gerekli'; if (!p.dob) er['dob'+i]='Tarih gerekli'; });
    if (mode === 'continue' && !prevC) er.prevC = 'Şirket seçin';
    if (!consent) er.consent = 'Onay gerekli';
    setErrs(er);
    if (!Object.keys(er).length) setSent(true);
  };
  if (sent) return <QuoteSuccess type="Sağlık" onReset={() => { setSent(false); setParts([{ tc: '', dob: '' }]); setConsent(false); }} />;
  const ip = { padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, width: '100%', outline: 'none' };
  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
      {parts.map((p, i) => (
        <div key={i} className="card" style={{ padding: 16, background: 'var(--slate-50)' }}>
          <div className="mono-tag" style={{ marginBottom: 10 }}>Kişi {i+1}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input style={ip} placeholder="TC No" maxLength={11} value={p.tc} onChange={e => setParts(parts.map((x, j) => j === i ? { ...x, tc: e.target.value.replace(/\D/g, '') } : x))} />
            <input type="date" style={ip} value={p.dob} onChange={e => setParts(parts.map((x, j) => j === i ? { ...x, dob: e.target.value } : x))} />
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary btn-sm" style={{ justifySelf: 'start' }} onClick={() => setParts([...parts, { tc: '', dob: '' }])}>+ Katılımcı ekle</button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <label className="card" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center', background: mode === 'new' ? 'var(--primary-50)' : '#fff', borderColor: mode === 'new' ? 'var(--primary)' : 'var(--border)' }}>
          <input type="radio" checked={mode === 'new'} onChange={() => setMode('new')} /> İlk poliçe
        </label>
        <label className="card" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center', background: mode === 'continue' ? 'var(--primary-50)' : '#fff', borderColor: mode === 'continue' ? 'var(--primary)' : 'var(--border)' }}>
          <input type="radio" checked={mode === 'continue'} onChange={() => setMode('continue')} /> Devam eden
        </label>
      </div>
      {mode === 'continue' && (
        <select style={ip} value={prevC} onChange={e => setPrevC(e.target.value)}>
          <option value="">Mevcut şirket seçiniz…</option>
          {AGENCIES.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      )}
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13 }}>
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> KVKK aydınlatma metnini onaylıyorum.
      </label>
      <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>Teklif Talebi Gönder <IconArrow size={12} /></button>
    </form>
  );
}

function QuoteSuccess({ type, onReset }) {
  return (
    <div style={{ padding: 8 }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}><IconCheck size={28} /></div>
      <h3 className="display-3" style={{ margin: '20px 0 10px' }}>Talebiniz alındı.</h3>
      <p style={{ color: 'var(--text-2)', margin: '0 0 20px' }}>{type} teklif talebiniz <strong>{COMPANY.quoteEmail}</strong> adresine iletildi. ≤ 4 saat içinde dönüş sağlanacak.</p>
      <button className="btn btn-secondary" onClick={onReset}>Yeni talep</button>
    </div>
  );
}

function QuotePage({ go }) {
  const [tab, setTab] = useSm('kasko');
  return (
    <div className="page-enter">
      <PageHeader kicker="Teklif Al" title={<>Teklifinizi alın, <span style={{ color: 'var(--primary)' }}>biz kıyaslayalım.</span></>}
        lead="22 şirketin tekliflerini sizin için karşılaştırıyoruz." breadcrumb="Ana Sayfa / Teklif Al" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32 }}>
            <aside>
              <div style={{ display: 'grid', gap: 8 }}>
                {[['kasko','Form 01','Kasko / Trafik'], ['saglik','Form 02','Sağlık Sigortası']].map(([k, n, t]) => (
                  <button key={k} onClick={() => setTab(k)} className="card" style={{ padding: 20, textAlign: 'left', background: tab === k ? 'var(--primary)' : '#fff', color: tab === k ? '#fff' : 'var(--text)', borderColor: tab === k ? 'var(--primary)' : 'var(--border)' }}>
                    <div className="mono-tag" style={{ color: tab === k ? 'rgba(255,255,255,0.7)' : 'var(--text-2)' }}>{n}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginTop: 6 }}>{t}</div>
                  </button>
                ))}
              </div>
            </aside>
            <div className="card" style={{ padding: 32 }}>
              {tab === 'kasko' ? <QuoteFormKasko /> : <QuoteFormSaglik />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function NotFound({ go }) {
  return (
    <div className="page-enter">
      <section className="section" style={{ textAlign: 'center', padding: '120px 0' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 144, fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.05em', lineHeight: 1 }}>404</div>
          <h1 className="display-2" style={{ margin: '20px 0' }}>Sayfa bulunamadı</h1>
          <button className="btn btn-primary" onClick={() => go('/')}>Ana sayfaya dön <IconArrow size={12} /></button>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { AboutPage, AgenciesPage, ContactPage, QuotePage, QuoteFormKasko, QuoteFormSaglik, QuoteSuccess, NotFound });
