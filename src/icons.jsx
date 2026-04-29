// Thin monochrome icons. Stroke=1.25, square corners.
const Icon = ({ children, size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none"
       stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter"
       className={className}>
    {children}
  </svg>
);

const IconCar = (p) => (
  <Icon {...p}>
    <path d="M5 20h22M6 20v-4l3-6h14l3 6v4M6 20v3h4v-3M22 20v3h4v-3M10 16h12"/>
    <circle cx="10" cy="20" r="1.3"/><circle cx="22" cy="20" r="1.3"/>
  </Icon>
);
const IconShield = (p) => (
  <Icon {...p}>
    <path d="M16 4l10 4v8c0 6-4.5 10-10 12-5.5-2-10-6-10-12V8l10-4z"/>
    <path d="M11 16l4 4 6-7"/>
  </Icon>
);
const IconHouse = (p) => (
  <Icon {...p}>
    <path d="M4 14L16 4l12 10v14H4V14z"/>
    <path d="M13 28v-8h6v8"/>
  </Icon>
);
const IconPig = (p) => (
  <Icon {...p}>
    <path d="M4 18c0 5 4 8 10 8s10-3 10-8c0-3-1.5-5.5-4-7l1-4-4 1c-1-.3-2-.4-3-.4-6 0-10 3-10 10z"/>
    <circle cx="11" cy="16" r="1"/><path d="M4 18H2M22 21l1 3"/>
  </Icon>
);
const IconHeart = (p) => (
  <Icon {...p}>
    <path d="M16 27S4 19 4 11a6 6 0 0 1 12-3 6 6 0 0 1 12 3c0 8-12 16-12 16z"/>
    <path d="M11 14h3l2-3 2 6 2-3h3"/>
  </Icon>
);
const IconTruck = (p) => (
  <Icon {...p}>
    <path d="M3 8h16v14H3zM19 13h6l3 4v5h-9"/>
    <circle cx="8" cy="24" r="2"/><circle cx="22" cy="24" r="2"/>
  </Icon>
);
const IconBaby = (p) => (
  <Icon {...p}>
    <circle cx="16" cy="12" r="6"/>
    <path d="M13 11h1M18 11h1M13 14c1 1 4 1 5 0"/>
    <path d="M8 28c1-5 4-8 8-8s7 3 8 8"/>
  </Icon>
);

const ICONS_BY_PRODUCT = {
  'kasko': IconCar,
  'trafik-sigortasi': IconShield,
  'konut-isyeri': IconHouse,
  'bireysel-emeklilik': IconPig,
  'saglik-sigortasi': IconHeart,
  'nakliyat-sigortasi': IconTruck,
  'dogum-sigortasi': IconBaby,
};

const IconArrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M2 8h12M9 3l5 5-5 5"/>
  </svg>
);

const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 9l4 4 8-10"/>
  </svg>
);

const IconPhone = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M3 3h3l2 4-2 1c1 2 3 4 5 5l1-2 4 2v3c0 1-1 2-2 2C8 18 2 12 2 6c0-1 1-2 1-3z" transform="translate(-1 -1)"/>
  </svg>
);

const IconUpload = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v13M7 8l5-5 5 5M4 17v3h16v-3"/>
  </svg>
);

const IconClose = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M3 3l10 10M13 3L3 13"/>
  </svg>
);

const IconPin = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
    <path d="M8 15s5-5 5-9a5 5 0 1 0-10 0c0 4 5 9 5 9z"/><circle cx="8" cy="6" r="1.8"/>
  </svg>
);

Object.assign(window, {
  Icon, IconCar, IconShield, IconHouse, IconPig, IconHeart, IconTruck, IconBaby,
  ICONS_BY_PRODUCT, IconArrow, IconCheck, IconPhone, IconUpload, IconClose, IconPin
});
