import { useState } from 'react';
import { COMPANY, AGENCIES, BRANCHES } from './data.jsx';
import { IconCheck, IconArrow } from './icons.jsx';
import { SectionLabel, PageHeader } from './components.jsx';

export function AboutPage({ go }) {
  const wants = [
    'İhtiyaç duyduğunuzda hemen ulaşmak ve doğru yönlendirme almak',
    'Sigorta işlerinizi güvendiğiniz birisinin takip etmesini sağlamak',
    'Tek bir seçeneğe mecbur kalmadan birçok alternatifin size sunulması',
    'Tüm bunları en uygun fiyata, zahmetsizce elde etmek',
  ];
  const milestones = [
    { n: '30+', l: 'Yıllık sektör deneyimi' },
    { n: '20',  l: 'Yıldır bağımsız acente' },
    { n: '22',  l: 'Yetkili sigorta acenteliği' },
    { n: '2',   l: 'Şehirde hizmet — Ankara & Denizli' },
  ];
  return (
    <div className="page-enter">
      <PageHeader
        kicker="Hakkımızda"
        title={<>Ne istediğinizi çok <span style={{ color: 'var(--primary)' }}>iyi biliyoruz.</span></>}
        lead="İhtiyaç duyduğunuzda hemen ulaşmak, doğru yönlendirme almak ve sigorta işlerinizi güvendiğiniz birisine bırakmak istiyorsunuz. Doğru yerdesiniz."
        breadcrumb="Ana Sayfa / Hakkımızda"
      />

      {/* Ne istiyorsunuz */}
      <section className="section" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel>Müşteri odağımız</SectionLabel>
              <h2 className="display-2" style={{ margin: '14px 0 24px' }}>
                Sizin için ne <span style={{ color: 'var(--primary)' }}>önemli?</span>
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
                {wants.map((w, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 8, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center', marginTop: 2 }}>
                      <IconCheck size={13} />
                    </span>
                    <span style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--text)' }}>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {milestones.map((m, i) => (
                <div key={i} className="card" style={{ padding: 28 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--primary)' }}>{m.n}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.4 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doğru Yerdesiniz */}
      <section className="section" style={{ background: 'var(--slate-50)', paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-start' }}>
            <div>
              <SectionLabel>Kimiz?</SectionLabel>
              <h2 className="display-2" style={{ margin: '14px 0 24px' }}>
                Doğru <span style={{ color: 'var(--primary)' }}>yerdesiniz.</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', margin: '0 0 20px' }}>
                30 yıla yakın bir süreden beri sektörün içindeyiz. Müşteri olduk, şirket çalışanı olduk — 20 yıldan bu yana acenteyiz.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', margin: '0 0 20px' }}>
                Ülkemizin en büyük ve uluslararası bilinirliği olan şirketlerinde çalıştık, farklı pozisyonlarda bulunduk, yöneticilik yaptık. Değişimin ve gelişimin gücüne inanıyoruz; onun için sürekli kendimizi yenilemeye çalışıyoruz.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', margin: 0 }}>
                Çalışmayı çok seviyoruz. Şimdiye kadar hep mutluluk ve memnuniyet yarattık — bundan sonra da telefonlarımız hep memnuniyet için çalsın istiyoruz. Operasyon kalitesinin işin kalitesine önemli etkilerinin olduğunu çok iyi biliyoruz; onun için işinde uzman takım arkadaşları ile çalışıyoruz.
              </p>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                ['Doğru eşleştirme', '22 şirketin ürünlerini karşılaştırarak ihtiyacınıza en uygun poliçeyi birlikte belirliyoruz.'],
                ['Şeffaf teminat', 'Hangi risk teminat altında, hangisi değil — her madde, her koşul açıkça anlatılır.'],
                ['Hasar takibi', 'Poliçe satışı bittiğinde işimiz başlar. Hasar sürecini uçtan uca sizin adınıza yönetiyoruz.'],
                ['Uzun vadeli ilişki', 'Her yenileme döneminde portföyünüz yeniden değerlendirilerek size en uygun seçenek sunulur.'],
              ].map(([t, d], i) => (
                <div key={i} className="card" style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700 }}>0{i+1}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{t}</div>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0, lineHeight: 1.55 }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portföy */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <SectionLabel>Portföy</SectionLabel>
            <h2 className="display-2" style={{ margin: '14px 0 24px' }}>
              Güçlü iş ortakları, <span style={{ color: 'var(--primary)' }}>doğru teklif.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', margin: '0 0 16px' }}>
              Gerek ulusal bazda gerekse uluslararası alanda en güçlü şirketlerin güvenilir iş ortağı olarak çalışmalarımıza devam ediyoruz.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', margin: '0 0 32px' }}>
              En doğru içeriği en uygun fiyata size sunmak için özen ve titizlikle çalışıyoruz. Bizi büyütecek en önemli unsurun sizin memnuniyetiniz ve mutluluğunuz olduğunu çok iyi biliyoruz.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => go('/acenteliklerimiz')}>Acenteliklerimiz <IconArrow size={12} /></button>
              <button className="btn btn-secondary" onClick={() => go('/teklif-al')}>Teklif Al <IconArrow size={12} /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AgencyCardFull({ agency, idx }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="card card-hover" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
      <div style={{ width: '100%', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!imgFailed ? (
          <img
            src={agency.logo}
            alt={agency.name}
            onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{agency.name}</span>
        )}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{agency.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>Yetkili Acente</div>
      </div>
    </div>
  );
}

export function AgenciesPage({ go }) {
  return (
    <div className="page-enter">
      <PageHeader kicker="Acentelikler" title={<>22 sigorta şirketinin <span style={{ color: 'var(--primary)' }}>yetkili acentesi.</span></>}
        lead="Türkiye'nin önde gelen ulusal ve uluslararası sigorta şirketleri." breadcrumb="Ana Sayfa / Acentelikler" />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {AGENCIES.map((a, i) => (
              <AgencyCardFull key={a.name} agency={a} idx={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const [s, setS] = useState({ name: '', phone: '', email: '', subject: '', message: '', consent: false });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!s.name.trim()) er.name = 'Ad soyad gerekli.';
    if (!/^\+?[\d\s]{10,}$/.test(s.phone)) er.phone = 'Geçerli bir telefon numarası giriniz.';
    if (s.email && !/\S+@\S+\.\S+/.test(s.email)) er.email = 'Geçerli bir e-posta giriniz.';
    if (!s.message.trim()) er.message = 'Mesajınızı giriniz.';
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
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}><IconCheck size={24} /></div>
      <h4 className="display-3" style={{ margin: '0 0 8px' }}>Mesajınız iletildi.</h4>
      <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 20px' }}>En kısa sürede size dönüş yapılacaktır.</p>
      <button className="btn btn-secondary" onClick={() => { setSent(false); setS({ name: '', phone: '', email: '', subject: '', message: '', consent: false }); }}>Yeni mesaj</button>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Ad Soyad *" err={errs.name}><input style={ip} value={s.name} onChange={e => setS({ ...s, name: e.target.value })} /></F>
        <F label="Telefon *" err={errs.phone}><input style={ip} type="tel" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} /></F>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="E-posta" err={errs.email}><input style={ip} type="email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} /></F>
        <F label="Konu" err={errs.subject}>
          <select style={ip} value={s.subject} onChange={e => setS({ ...s, subject: e.target.value })}>
            <option value="">Seçiniz…</option>
            <option>Teklif Talebi</option>
            <option>Hasar Bildirimi</option>
            <option>Poliçe Yenileme</option>
            <option>Genel Bilgi</option>
          </select>
        </F>
      </div>
      <F label="Mesajınız *" err={errs.message}>
        <textarea style={{ ...ip, resize: 'vertical', minHeight: 100 }} value={s.message} onChange={e => setS({ ...s, message: e.target.value })} />
      </F>
      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13, cursor: 'pointer' }}>
        <input type="checkbox" style={{ marginTop: 1 }} checked={s.consent} onChange={e => setS({ ...s, consent: e.target.checked })} />
        <span>KVKK kapsamında kişisel verilerimin işlenmesini kabul ediyorum.</span>
      </label>
      {errs.consent && <span style={{ fontSize: 12, color: 'var(--primary)', marginTop: -8 }}>{errs.consent}</span>}
      <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>
        Mesaj Gönder <IconArrow size={12} />
      </button>
    </form>
  );
}

export function ContactPage({ go }) {
  return (
    <div className="page-enter">
      <PageHeader
        kicker="İletişim"
        title={<>Size en yakın <span style={{ color: 'var(--primary)' }}>şubemiz.</span></>}
        lead="Ankara merkez ve 4 şubemizle Türkiye genelinde yanınızdayız. Bizi arayın veya form üzerinden ulaşın."
        breadcrumb="Ana Sayfa / İletişim"
      />
      <section className="section" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'flex-start' }}>

            {/* Sol: Şube listesi */}
            <div style={{ display: 'grid', gap: 10 }}>
              {BRANCHES.map((b) => (
                <div key={b.id} className="card" style={{ padding: '18px 22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <SectionLabel>{b.type}</SectionLabel>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, margin: '4px 0 2px' }}>{b.label}</div>
                      {b.contact !== 'AOL Sigorta Genel Müdürlük' && b.contact !== 'AOL Sigorta Denizli' && (
                        <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{b.contact}</div>
                      )}
                      <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 6, lineHeight: 1.45 }}>{b.addr}</div>
                    </div>
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
                      <a href={`tel:${b.phone.replace(/\s/g, '')}`} style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{b.phone}</a>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${b.mapQ}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ fontSize: 11 }}>
                        Haritada Aç
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sağ: İletişim formu */}
            <div className="card" style={{ padding: 32, position: 'sticky', top: 100 }}>
              <div style={{ marginBottom: 24 }}>
                <SectionLabel>İletişim Formu</SectionLabel>
                <h3 className="display-3" style={{ margin: '8px 0 6px' }}>Mesaj gönderin.</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>En kısa sürede uzman ekibimiz size dönüş yapar.</p>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export function QuoteFormKasko({ compact = false }) {
  const empty = { type: 'bireysel', tc: '', vkn: '', dob: '', phone: '', job: '', plate: '', docSerial: '', consent: false };
  const [s, setS] = useState(empty);
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (s.type === 'bireysel') {
      if (!/^\d{11}$/.test(s.tc)) er.tc = '11 haneli TC giriniz.';
      if (!s.dob) er.dob = 'Doğum tarihi gerekli.';
    } else {
      if (!/^\d{10}$/.test(s.vkn)) er.vkn = '10 haneli VKN giriniz.';
    }
    if (!/^\+?[\d\s]{10,}$/.test(s.phone)) er.phone = 'Geçerli telefon giriniz.';
    if (!s.job.trim()) er.job = 'Meslek gerekli.';
    if (!s.plate.trim()) er.plate = 'Plaka gerekli.';
    if (!s.docSerial.trim()) er.docSerial = 'Belge seri no gerekli.';
    if (!s.consent) er.consent = 'KVKK onayı gerekli.';
    setErrs(er);
    if (!Object.keys(er).length) setSent(true);
  };
  if (sent) return <QuoteSuccess type="Kasko / Trafik" onReset={() => { setSent(false); setS(empty); }} />;
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
      {/* Bireysel / Kurumsal toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {['bireysel', 'kurumsal'].map(t => (
          <label key={t} className="card" style={{ padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', background: s.type === t ? 'var(--primary-50)' : '#fff', borderColor: s.type === t ? 'var(--primary)' : 'var(--border)' }}>
            <input type="radio" checked={s.type === t} onChange={() => setS({ ...s, type: t, tc: '', vkn: '', dob: '' })} />
            <span style={{ fontSize: 14, fontWeight: 600, color: s.type === t ? 'var(--primary)' : 'var(--text)' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
          </label>
        ))}
      </div>

      {/* TC / VKN + tarih */}
      {s.type === 'bireysel' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <F label="T.C. Kimlik No *" err={errs.tc}><input style={ip} maxLength={11} value={s.tc} onChange={e => setS({ ...s, tc: e.target.value.replace(/\D/g, '') })} /></F>
          <F label="Doğum tarihi *" err={errs.dob}><input type="date" style={ip} value={s.dob} onChange={e => setS({ ...s, dob: e.target.value })} /></F>
        </div>
      ) : (
        <F label="Vergi Kimlik No (VKN) *" err={errs.vkn}><input style={ip} maxLength={10} value={s.vkn} onChange={e => setS({ ...s, vkn: e.target.value.replace(/\D/g, '') })} /></F>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <F label="Telefon *" err={errs.phone}><input style={ip} type="tel" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} /></F>
        <F label="Meslek *" err={errs.job}><input style={ip} value={s.job} onChange={e => setS({ ...s, job: e.target.value })} /></F>
      </div>
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

export function QuoteFormSaglik({ compact = false }) {
  const [parts, setParts] = useState([{ tc: '', dob: '' }]);
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState('new');
  const [prevC, setPrevC] = useState('');
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [errs, setErrs] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    parts.forEach((p, i) => { if (!/^\d{11}$/.test(p.tc)) er['tc'+i]='TC gerekli'; if (!p.dob) er['dob'+i]='Tarih gerekli'; });
    if (!/^\+?[\d\s]{10,}$/.test(phone)) er.phone = 'Geçerli telefon giriniz.';
    if (mode === 'continue' && !prevC) er.prevC = 'Şirket seçin';
    if (!consent) er.consent = 'Onay gerekli';
    setErrs(er);
    if (!Object.keys(er).length) setSent(true);
  };
  if (sent) return <QuoteSuccess type="Sağlık" onReset={() => { setSent(false); setParts([{ tc: '', dob: '' }]); setPhone(''); setConsent(false); }} />;
  const ip = { padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 14, width: '100%', outline: 'none' };
  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
      <div>
        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Telefon *</span>
          <input style={ip} type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          {errs.phone && <span style={{ fontSize: 12, color: 'var(--primary)' }}>{errs.phone}</span>}
        </label>
      </div>
      {parts.map((p, i) => (
        <div key={i} className="card" style={{ padding: 16, background: 'var(--slate-50)' }}>
          <div className="mono-tag" style={{ marginBottom: 10 }}>Kişi {i+1}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input style={ip} placeholder="TC No" maxLength={11} value={p.tc} onChange={e => setParts(parts.map((x, j) => j === i ? { ...x, tc: e.target.value.replace(/\D/g, '') } : x))} />
            <input type="date" style={ip} value={p.dob} onChange={e => setParts(parts.map((x, j) => j === i ? { ...x, dob: e.target.value } : x))} />
            {(errs['tc'+i] || errs['dob'+i]) && (
              <span style={{ fontSize: 12, color: 'var(--primary)', gridColumn: '1/-1' }}>{errs['tc'+i] || errs['dob'+i]}</span>
            )}
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
          {AGENCIES.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
        </select>
      )}
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13 }}>
        <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> KVKK aydınlatma metnini onaylıyorum.
      </label>
      <button className="btn btn-primary" type="submit" style={{ justifySelf: 'start' }}>Teklif Talebi Gönder <IconArrow size={12} /></button>
    </form>
  );
}

export function QuoteSuccess({ type, onReset }) {
  return (
    <div style={{ padding: 8 }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--primary-50)', color: 'var(--primary)', display: 'grid', placeItems: 'center' }}><IconCheck size={28} /></div>
      <h3 className="display-3" style={{ margin: '20px 0 10px' }}>Talebiniz alındı.</h3>
      <p style={{ color: 'var(--text-2)', margin: '0 0 20px' }}>{type} teklif talebiniz <strong>{COMPANY.quoteEmail}</strong> adresine iletildi. ≤ 4 saat içinde dönüş sağlanacak.</p>
      <button className="btn btn-secondary" onClick={onReset}>Yeni talep</button>
    </div>
  );
}

export function QuotePage({ go }) {
  const [tab, setTab] = useState('kasko');
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

export function BranchesPage({ go }) {
  return (
    <div className="page-enter">
      <PageHeader
        kicker="Şubeler"
        title={<>Türkiye genelinde <span style={{ color: 'var(--primary)' }}>5 şube.</span></>}
        lead="Ankara merkezimiz ve dört şubemizle yanınızdayız."
        breadcrumb="Ana Sayfa / Şubeler"
      />
      <section className="section" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gap: 40 }}>
            {BRANCHES.map((b) => (
              <div key={b.id} className="card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {/* Sol: bilgi */}
                  <div style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <SectionLabel>{b.type}</SectionLabel>
                      <h3 className="display-3" style={{ margin: '10px 0 4px' }}>{b.label}</h3>
                      <div style={{ fontSize: 14, color: 'var(--text-2)' }}>{b.contact}</div>
                    </div>
                    <div style={{ display: 'grid', gap: 14 }}>
                      <div>
                        <div className="mono-tag" style={{ color: 'var(--text-2)', marginBottom: 4 }}>Adres</div>
                        <div style={{ fontSize: 15, lineHeight: 1.55 }}>{b.addr}</div>
                      </div>
                      <div>
                        <div className="mono-tag" style={{ color: 'var(--text-2)', marginBottom: 4 }}>Telefon</div>
                        <a href={`tel:${b.phone.replace(/\s/g, '')}`} style={{ fontSize: 17, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>{b.phone}</a>
                      </div>
                      <div>
                        <div className="mono-tag" style={{ color: 'var(--text-2)', marginBottom: 4 }}>E-posta</div>
                        <a href={`mailto:${b.email}`} style={{ fontSize: 15, color: 'var(--text)', textDecoration: 'none' }}>{b.email}</a>
                      </div>
                    </div>
                  </div>
                  {/* Sağ: harita */}
                  <div style={{ minHeight: 280, background: 'var(--slate-50)' }}>
                    <iframe
                      title={b.label}
                      src={`https://maps.google.com/maps?q=${b.mapQ}&output=embed&hl=tr`}
                      style={{ width: '100%', height: '100%', border: 0, display: 'block', minHeight: 280 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
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

function LegalPage({ kicker, title, children, go }) {
  return (
    <div className="page-enter">
      <PageHeader kicker={kicker} title={title} breadcrumb={`Ana Sayfa / ${kicker}`} />
      <section className="section" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ maxWidth: 760, display: 'grid', gap: 28 }}>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>{title}</h3>
      <div style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

export function GizlilikPage({ go }) {
  return (
    <LegalPage kicker="Gizlilik Politikası" title={<>Kişisel verileriniz <span style={{ color: 'var(--primary)' }}>güvende.</span></>} go={go}>
      <LegalSection title="Amaç ve Kapsam">
        Artı Oluşum Sigorta Aracılık Hizmetleri Ltd. Şti. olarak, web sitemizi ziyaret eden ve hizmetlerimizden yararlanan kişilerin kişisel verilerinin korunmasına büyük önem vermekteyiz. Bu politika, hangi verileri topladığımızı, nasıl kullandığımızı ve haklarınızı açıklamaktadır.
      </LegalSection>
      <LegalSection title="Toplanan Veriler">
        Adınız, soyadınız, TC kimlik numaranız, telefon numaranız, e-posta adresiniz ve sigorta poliçenizle ilgili bilgiler yalnızca hizmet sunumu amacıyla toplanmaktadır. Tarafınızdan onay alınmadan üçüncü kişilerle paylaşılmaz.
      </LegalSection>
      <LegalSection title="Verilerin Kullanımı">
        Toplanan veriler; teklif hazırlama, poliçe düzenleme, hasar takibi ve müşteri hizmetleri amacıyla kullanılmaktadır. Yasal yükümlülükler kapsamında yetkili kurum ve kuruluşlarla paylaşılabilir.
      </LegalSection>
      <LegalSection title="İletişim">
        Gizlilik politikamıza ilişkin sorularınız için <a href="mailto:info@aol.gen.tr" style={{ color: 'var(--primary)' }}>info@aol.gen.tr</a> adresine ulaşabilirsiniz.
      </LegalSection>
    </LegalPage>
  );
}

export function KvkkPage({ go }) {
  return (
    <LegalPage kicker="KVKK" title={<>Aydınlatma <span style={{ color: 'var(--primary)' }}>metni.</span></>} go={go}>
      <LegalSection title="Veri Sorumlusu">
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla Artı Oluşum Sigorta Aracılık Hizmetleri Ltd. Şti. (Aziziye Mah. Cinnah Cad. No:50/12, Çankaya / Ankara) kişisel verilerinizi işlemektedir.
      </LegalSection>
      <LegalSection title="İşlenen Kişisel Veriler">
        Kimlik bilgileri (ad, soyad, TC kimlik no), iletişim bilgileri (telefon, e-posta, adres), finansal bilgiler ve sigorta poliçe bilgileri işlenmektedir.
      </LegalSection>
      <LegalSection title="İşleme Amaçları">
        Sigorta aracılık hizmetinin sunulması, poliçe düzenlenmesi, hasar takibi, yasal yükümlülüklerin yerine getirilmesi ve müşteri ilişkilerinin yönetilmesi amaçlarıyla verileriniz işlenmektedir.
      </LegalSection>
      <LegalSection title="Haklarınız">
        KVKK'nın 11. maddesi uyarınca; verilerinize erişim, düzeltme, silme, işlemenin kısıtlanması ve itiraz haklarına sahipsiniz. Taleplerinizi <a href="mailto:info@aol.gen.tr" style={{ color: 'var(--primary)' }}>info@aol.gen.tr</a> adresine iletebilirsiniz.
      </LegalSection>
    </LegalPage>
  );
}

export function CerezPage({ go }) {
  return (
    <LegalPage kicker="Çerez Politikası" title={<>Çerez <span style={{ color: 'var(--primary)' }}>kullanımı.</span></>} go={go}>
      <LegalSection title="Çerezler Nedir?">
        Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınıza yerleştirilen küçük metin dosyalarıdır. Siteyi daha verimli kullanmanızı sağlamak ve deneyiminizi kişiselleştirmek amacıyla kullanılmaktadır.
      </LegalSection>
      <LegalSection title="Kullandığımız Çerezler">
        <ul style={{ margin: '0', paddingLeft: 20, display: 'grid', gap: 8 }}>
          <li><strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir, devre dışı bırakılamaz.</li>
          <li><strong>Analitik çerezler:</strong> Ziyaretçi davranışlarını anlamamızı sağlar, anonim tutulur.</li>
          <li><strong>Tercih çerezleri:</strong> Dil ve görünüm gibi tercihlerinizi hatırlar.</li>
        </ul>
      </LegalSection>
      <LegalSection title="Çerezleri Yönetme">
        Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi sitenin işlevselliğini etkileyebilir.
      </LegalSection>
      <LegalSection title="İletişim">
        Çerez politikamıza ilişkin sorularınız için <a href="mailto:info@aol.gen.tr" style={{ color: 'var(--primary)' }}>info@aol.gen.tr</a> adresine ulaşabilirsiniz.
      </LegalSection>
    </LegalPage>
  );
}

export function NotFound({ go }) {
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
