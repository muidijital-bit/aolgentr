import { useState, useEffect, useMemo } from 'react';
import { Header, Hero } from './header-hero.jsx';
import { Footer, TweaksPanel } from './components.jsx';
import { ProductsSection, AboutStrip, QuickQuote, AgenciesSection } from './pages-home.jsx';
import { ProductsList, ProductDetail } from './pages-products.jsx';
import { AboutPage, AgenciesPage, ContactPage, QuotePage, NotFound } from './pages-misc.jsx';

function HomePage({ go }) {
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
  const [route, setRoute] = useState(() => localStorage.getItem('aol-route') || '/');
  const [, force] = useState(0);
  useEffect(() => {
    const onTweak = () => force(x => x + 1);
    window.addEventListener('tweaks-changed', onTweak);
    return () => window.removeEventListener('tweaks-changed', onTweak);
  }, []);
  const go = (path) => {
    setRoute(path);
    localStorage.setItem('aol-route', path);
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
    return <NotFound go={go} />;
  }, [route]);
  return (
    <>
      <Header route={route} go={go} />
      <main key={route}>{page}</main>
      <Footer go={go} />
      <TweaksPanel />
    </>
  );
}
