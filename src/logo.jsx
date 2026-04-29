export function AolLogo({ height = 56, mono = false }) {
  const sigortaSize = Math.round(height * 0.32);
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: Math.round(height * 0.06) }}>
      <img
        src="/assets/aol-mark.png"
        alt="AOL — Artı Oluşum Sigorta"
        style={{
          height,
          width: 'auto',
          display: 'block',
          filter: mono ? 'brightness(0) invert(1)' : 'none',
        }}
      />
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: sigortaSize,
        letterSpacing: '0.35em',
        color: mono ? '#ffffff' : 'var(--primary)',
        lineHeight: 1,
        userSelect: 'none',
        paddingLeft: '0.35em',
      }}>
        SİGORTA
      </span>
    </div>
  );
}
