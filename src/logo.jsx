/* AOL Logo — uses official brand lockups (assets/aol-logo-dark.png + aol-logo-white.png) */
function AolLogo({ height = 56, mono = false }) {
  // Full lockup is 902 × 692 (mark + "ARTI OLUŞUM SİGORTA / ARACILIK HİZMETLERİ LTD. ŞTİ.")
  const src = mono ? 'assets/aol-logo-white.png' : 'assets/aol-logo-dark.png';
  const w = Math.round(height * (902 / 692));
  return (
    <img
      src={src}
      alt="AOL — Artı Oluşum Sigorta Aracılık Hizmetleri Ltd. Şti."
      style={{ height, width: w, display: 'block' }}
    />
  );
}

Object.assign(window, { AolLogo });
