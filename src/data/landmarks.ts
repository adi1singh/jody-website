// Line drawings of a landmark for Indian states (Hind Zero Waste's installed-base
// cards). Each is an SVG path in a 120×100 box, drawn with a 2px stroke in
// currentColor. Use with PlaceCards: mark={INDIA_LANDMARKS.Rajasthan}.

// Hawa Mahal: five stepped tiers, each with a row of small arched windows and domed caps.
const tiers = [
  [10, 110, 74, 92],
  [18, 102, 60, 74],
  [28, 92, 47, 60],
  [40, 80, 35, 47],
  [50, 70, 25, 35],
];
const hawaMahal = [
  'M4 92H116',
  ...tiers.map(([x0, x1, top, bottom]) => `M${x0} ${bottom}V${top}H${x1}V${bottom}`),
  ...tiers.flatMap(([x0, x1, top, bottom]) => {
    const out: string[] = [];
    for (let x = x0 + 5; x + 6 <= x1 - 3; x += 10) out.push(`M${x} ${bottom - 2}v-${Math.max(4, (bottom - top) / 2 - 2)}q3 -4 6 0v${Math.max(4, (bottom - top) / 2 - 2)}`);
    for (let x = x0 + 3; x + 6 <= x1 - 1; x += 10) out.push(`M${x} ${top}q3 -5 6 0`);
    return out;
  }),
  'M60 20V14',
].join('');

const columns = Array.from({ length: 14 }, (_, i) => `M${15 + i * 7} 66V90`).join('');
const arches = (y: number, from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => `M${from + i * step} ${y}v-6q3 -4 6 0v6`).join('');

export const INDIA_LANDMARKS: Record<string, string> = {
  // Gateway of India
  Maharashtra:
    'M4 92H116M16 92V40H104V92M46 92V58Q46 42 60 42Q74 42 74 58V92M24 92V70Q24 62 31 62Q38 62 38 70V92M82 92V70Q82 62 89 62Q96 62 96 70V92M12 40H108M14 35H106M22 35V25H30V35M22 25Q26 17 30 25M44 35V25H52V35M44 25Q48 17 52 25M68 35V25H76V35M68 25Q72 17 76 25M90 35V25H98V35M90 25Q94 17 98 25',
  Rajasthan: hawaMahal,
  // Taj Mahal
  'Uttar Pradesh':
    'M4 92H116M14 92V86H106V92M34 86V56H86V86M52 86V68Q52 60 60 60Q68 60 68 68V86M38 82V72Q38 68 41 68Q44 68 44 72V82M76 82V72Q76 68 79 68Q82 68 82 72V82M46 56V50H74V56M46 50C42 36 52 28 60 22C68 28 78 36 74 50M60 22V12M36 56V50H44V56M36 50Q40 43 44 50M76 56V50H84V56M76 50Q80 43 84 50M9 86V38H15V86M8 38Q12 31 16 38M8 52H16M8 68H16M105 86V38H111V86M104 38Q108 31 112 38M104 52H112M104 68H112',
  // Parliament House
  Delhi: `M4 92H116M8 92V64H112V92${columns}M6 64H114M8 60H112M24 60V48H96V60M48 48Q60 32 72 48M60 38V22M60 22H70V28H60`,
  // Himalayan peaks and deodars
  'Himachal Pradesh':
    'M4 92H116M4 92L34 44L52 68L74 30L104 74M27 55L31 59L34 54L38 58L41 55M66 42L70 46L74 41L78 46L82 42M96 92V84M88 86L96 70L104 86ZM90 76L96 62L102 76ZM110 92V86M105 88L110 78L115 88Z',
  // Golden Temple
  Punjab: `M4 86H116M6 96q6 -3 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0M28 86V64H92V86${arches(84, 32, 80, 12)}M38 64V54H82V64M44 54C42 42 52 36 60 30C68 36 78 42 76 54M60 30V22M30 64V58H36V64M30 58Q33 52 36 58M84 64V58H90V64M84 58Q87 52 90 58`,
  // Charminar
  Telangana: `M4 92H116M28 92V48H92V92M44 92V66Q44 54 60 54Q76 54 76 66V92M28 48H92M32 48V38H88V48${arches(46, 36, 80, 11)}M20 92V20H28V92M18 52H30M18 36H30M20 20Q24 10 28 20M24 13V8M92 92V20H100V92M90 52H102M90 36H102M92 20Q96 10 100 20M96 13V8`,
};
