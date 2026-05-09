import { useState, useEffect, useMemo } from 'react';
import { useSEO, HOME_FAQ } from './seo.jsx';
import { Header, Hero } from './header-hero.jsx';
import { Footer, TweaksPanel, CookieConsent } from './components.jsx';
import { ProductsSection, AboutStrip, QuickQuote, AgenciesSection } from './pages-home.jsx';
import { ProductsList, ProductDetail } from './pages-products.jsx';
import { AboutPage, AgenciesPage, ContactPage, QuotePage, GizlilikPage, KvkkPage, CerezPage, NotFound } from './pages-misc.jsx';
import { AdminPanel } from './admin.jsx';

function HomePage({ go }) {
  useSEO({
    title: 'AOL Sigorta — Ankara Sigorta Acentesi | 30 Yıllık Deneyim',
    description: 'Ankara\'nın köklü sigorta acentesi. +20 sigorta şirketinin tekliflerini karşılaştırıyoruz. Kasko, sağlık, konut, bireysel emeklilik ve daha fazlası. 0312 468 34 50',
    path: '/',
    breadcrumbs: [{ name: 'Ana Sayfa', path: '/' }],
    faq: HOME_FAQ,
  });
  return (
    <div className="page-enter">
      <Hero go={go} />
      <ProductsSection go={go} />
      <AboutStrip go={go} />
      <QuickQuote go={go} />
      <AgenciesSection go={go} />
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => {
    const urlPath = window.location.pathname;
    if (urlPath && urlPath !== '/') return urlPath;
    return localStorage.getItem('aol-route') || '/';
  });
  const [, force] = useState(0);
  useEffect(() => {
    const onTweak = () => force(x => x + 1);
    window.addEventListener('tweaks-changed', onTweak);
    return () => window.removeEventListener('tweaks-changed', onTweak);
  }, []);
  const go = (path) => {
    setRoute(path);
    localStorage.setItem('aol-route', path);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const page = useMemo(() => {
    if (route === '/') return <HomePage go={go} />;
    if (route === '/hakkimizda') return <AboutPage go={go} />;
    if (route === '/urunler') return <ProductsList go={go} />;
    if (route.startsWith('/urunler/')) return <ProductDetail id={route.replace('/urunler/', '')} go={go} />;
    if (route === '/acenteliklerimiz') return <AgenciesPage go={go} />;
    if (route === '/iletisim') return <ContactPage go={go} />;
    if (route.startsWith('/teklif-al')) return <QuotePage go={go} />;
    if (route === '/gizlilik') return <GizlilikPage go={go} />;
    if (route === '/kvkk') return <KvkkPage go={go} />;
    if (route === '/cerez') return <CerezPage go={go} />;
    if (route === '/admin') return <AdminPanel go={go} />;
    return <NotFound go={go} />;
  }, [route]);

  if (route === '/admin') return <div key={route}>{page}</div>;

  return (
    <>
      <Header route={route} go={go} />
      <main key={route}>{page}</main>
      <Footer go={go} />
      <TweaksPanel />
      <CookieConsent go={go} />
    </>
  );
}
