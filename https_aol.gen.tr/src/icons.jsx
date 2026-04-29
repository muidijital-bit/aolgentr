export const Icon = ({ children, size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
       stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter"
       className={className}>
    {children}
  </svg>
);

export const IconCar = (p) => (
  <Icon {...p}>
    <path d="M5 20h22M6 20v-4l3-6h14l3 6v4M6 20v3h4v-3M22 20v3h4v-3M10 16h12"/>
    <circle cx="10" cy="20" r="1.3"/><circle cx="22" cy="20" r="1.3"/>
  </Icon>
);
export const IconShield = (p) => (
  <Icon {...p}>
    <path d="M16 4l10 4v8c0 6-4.5 10-10 12-5.5-2-10-6-10-12V8l10-4z"/>
    <path d="M11 16l4 4 6-7"/>
  </Icon>
);
export const IconHouse = (p) => (
  <Icon {...p}>
    <path d="M4 14L16 4l12 10v14H4V14z"/>
    <path d="M13 28v-8h6v8"/>
  </Icon>
);
export const IconPig = (p) => (
  <Icon {...p}>
    <path d="M4 18c0 5 4 8 10 8s10-3 10-8c0-3-1.5-5.5-4-7l1-4-4 1c-1-.3-2-.4-3-.4-6 0-10 3-10 10z"/>
    <circle cx="11" cy="16" r="1"/><path d="M4 18H2M22 21l1 3"/>
  </Icon>
);
export const IconHeart = (p) => (
  <Icon {...p}>
    <path d="M16 27S4 19 4 11a6 6 0 0 1 12-3 6 6 0 0 1 12 3c0 8-12 16-12 16z"/>
    <path d="M11 14h3l2-3 2 6 2-3h3"/>
  </Icon>
);
export const IconTruck = (p) => (
  <Icon {...p}>
    <path d="M3 8h16v14H3zM19 13h6l3 4v5h-9"/>
    <circle cx="8" cy="24" r="2"/><circle cx="22" cy="24" r="2"/>
  </Icon>
);
export const IconBaby = (p) => (
  <Icon {...p}>
    <circle cx="16" cy="12" r="6"/>
    <path d="M13 11h1M18 11h1M13 14c1 1 4 1 5 0"/>
    <path d="M8 28c1-5 4-8 8-8s7 3 8 8"/>
  </Icon>
);

/* ---- New icons ---- */
export const IconPerson = (p) => (
  <Icon {...p}>
    <circle cx="16" cy="9" r="5"/>
    <path d="M6 28c0-6 4.5-10 10-10s10 4 10 10"/>
    <path d="M11 21l-2 3M21 21l2 3"/>
  </Icon>
);
export const IconLife = (p) => (
  <Icon {...p}>
    <circle cx="16" cy="8" r="4"/>
    <path d="M8 28c0-5 3.5-9 8-9s8 4 8 9"/>
    <path d="M13 19h6M16 16v6"/>
  </Icon>
);
export const IconBuilding = (p) => (
  <Icon {...p}>
    <path d="M4 28V12l12-6 12 6v16H4z"/>
    <path d="M13 28v-8h6v8"/>
    <path d="M10 14h2M20 14h2M10 19h2M20 19h2"/>
  </Icon>
);
export const IconEarthquake = (p) => (
  <Icon {...p}>
    <path d="M6 28V14l10-7 10 7v14"/>
    <path d="M13 28v-7h6v7"/>
    <path d="M2 20l4-1M30 20l-4-1"/>
    <path d="M4 24l2-1M28 24l-2-1"/>
  </Icon>
);
export const IconPlane = (p) => (
  <Icon {...p}>
    <path d="M28 12l-6 4-4-8-4 2 2 8-6 4 1 3 8-2 2 6 4-1-1-8 6-3-2-5z"/>
  </Icon>
);

export const ICONS_BY_PRODUCT = {
  'kasko':              IconCar,
  'trafik-sigortasi':   IconShield,
  'ferdi-kaza':         IconPerson,
  'hayat-sigortasi':    IconLife,
  'konut-sigortasi':    IconHouse,
  'isyeri-sigortasi':   IconBuilding,
  'dask':               IconEarthquake,
  'saglik-sigortasi':   IconHeart,
  'bireysel-emeklilik': IconPig,
  'seyahat-sigortasi':  IconPlane,
  'nakliyat-sigortasi': IconTruck,
  'dogum-sigortasi':    IconBaby,
};

export const IconArrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M2 8h12M9 3l5 5-5 5"/>
  </svg>
);

export const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 9l4 4 8-10"/>
  </svg>
);

export const IconPhone = ({ size = 14 }) => (
  <svg width={size} height={18} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M3 3h3l2 4-2 1c1 2 3 4 5 5l1-2 4 2v3c0 1-1 2-2 2C8 18 2 12 2 6c0-1 1-2 1-3z" transform="translate(-1 -1)"/>
  </svg>
);

export const IconUpload = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v13M7 8l5-5 5 5M4 17v3h16v-3"/>
  </svg>
);

export const IconClose = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M3 3l10 10M13 3L3 13"/>
  </svg>
);

export const IconPin = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M8 15s5-5 5-9a5 5 0 1 0-10 0c0 4 5 9 5 9z"/><circle cx="8" cy="6" r="1.8"/>
  </svg>
);
