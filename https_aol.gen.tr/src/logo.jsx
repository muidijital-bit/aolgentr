export function AolLogo({ height = 56, mono = false }) {
  return (
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
  );
}
