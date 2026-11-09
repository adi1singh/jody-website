/**
 * Primary authority: Jody meeting brief, 5 November 2026, supplied by the client.
 * See docs/client-brief-2026-11-05.md. It supersedes conflicting legacy-site copy.
 * Supporting source: https://jody-website.vercel.app/ (reviewed 9 November 2026).
 * The 90 minutes describes the whole-life analysis, not the full appointment.
 * No biography, testimonials, medical outcomes or service locations are invented.
 * Live integration and asset configuration belongs to site-config.ts, not here.
 */

export const brand = {
  name: 'Jody Pockran',
  role: 'Master hypnotherapist · Life coach · NLP practitioner',
  email: 'jannpockran@gmail.com',
  emailHref: 'mailto:jannpockran@gmail.com',
  enquiryHref: '#booking',
  sourceUrl: 'https://jody-website.vercel.app/',
  currency: 'AUD',
  credentials: [
    'Master hypnotherapist',
    'Master life coach',
    'NLP practitioner',
    'Equestrian mindset coach',
  ],
} as const;

export const hero = {
  name: brand.name,
  title: 'Change the story.',
  accent: 'Change your life.',
  description: 'Personal hypnotherapy for overwhelm, habits and change, alongside monthly mentoring and equestrian mindset coaching.',
  audience: 'A particular focus on women experiencing overwhelm.',
  primaryCta: 'Request a session',
  primaryHref: '#booking',
  cta: 'Begin the story',
  href: '#story',
  image: '/images/jody-portrait.webp',
} as const;

export const chapters = [
  {
    id: 'story', number: 'I', navLabel: 'The story',
    title: 'A life, still unfolding.',
    description: 'Meet Jody: a master hypnotherapist, master life coach and NLP practitioner whose work begins with the whole person.',
    image: '/images/jody-portrait.webp',
    imageAlt: 'Jody Pockran in a white blouse with a gold chain print.',
  },
  {
    id: 'work', number: 'II', navLabel: 'The work',
    title: 'A different way forward.',
    description: 'Hypnosis is the main pillar of Jody’s work, supported by specialist sessions and ongoing monthly mentoring.',
    image: '/images/hand-wheat.webp',
    imageAlt: 'A hand brushing through a sunlit field of wheat.',
  },
  {
    id: 'equestrian', number: 'III', navLabel: 'The connection',
    title: 'Find your stride.',
    description: 'Equestrian mindset coaching for riders and competitors, with a focus on nerves, concentration and confidence in competition.',
    status: 'New offering',
    image: '/images/black-horse.webp',
    imageAlt: 'A close portrait of a black horse.',
  },
  {
    id: 'book', number: 'IV', navLabel: 'The book',
    title: 'Live Sexy Now.',
    description: 'Jody’s forthcoming book explores confidence and reinvention: how it feels to be more at home in your own life.',
    status: 'Coming soon',
  },
  {
    id: 'beyond', number: 'V', navLabel: 'Beyond the page',
    title: 'Beyond the page.',
    description: 'The forthcoming podcast, speaking, commentating and four free recordings continue the conversation beyond a session.',
    image: '/images/gold-microphone.webp',
    imageAlt: 'A microphone lit by warm light.',
  },
  {
    id: 'contact', number: 'VI', navLabel: 'Your next chapter',
    title: 'Your next chapter.',
    description: 'Tell Jody what you would like to explore. Session requests are confirmed with Jody before an appointment is booked.',
    cta: 'Request a session',
    href: brand.enquiryHref,
  },
] as const;

export const services = [
  {
    id: 'hypnotherapy',
    name: 'Hypnotherapy',
    description: 'A 90-minute whole-life analysis, followed by hypnosis and a personal recording made on your phone.',
    format: 'Standard hypnosis session',
    primary: true,
    audience: 'Women experiencing overwhelm, and people exploring concerns, patterns or habits they would like to change.',
    price: '$250 AUD',
    note: 'Quit smoking costs more than the standard session. Enquire about specialist-session pricing.',
    href: brand.enquiryHref,
  },
  {
    id: 'coaching',
    name: 'Life coaching',
    description: 'Ongoing mentoring with goals agreed together and regular monthly check-ins.',
    format: 'Monthly packages',
    price: 'Enquire for pricing',
    note: 'Mentoring and monthly support, separate from therapy.',
    href: '#booking',
  },
  {
    id: 'equestrian',
    name: 'Equestrian mindset',
    description: 'Mindset coaching for riders and competitors working on nerves, focus and competition confidence.',
    format: 'By enquiry',
    status: 'New offering',
    price: 'Enquire for pricing',
    href: '#booking',
  },
] as const;

export const hypnosisConcerns = [
  'Overwhelm',
  'Anxiety',
  'Depression',
  'Phobias',
  'Childhood trauma',
  'Money blocks',
] as const;

export const specialistSessions = [
  { id: 'quit-smoking', name: 'Quit smoking', description: 'A dedicated hypnosis session for people wanting to stop smoking.', price: 'Above the standard session price; enquire for details.', href: '#booking' },
  { id: 'quit-vaping', name: 'Quit vaping', description: 'Enquire about hypnosis for people wanting to stop vaping.', price: 'Enquire for pricing.', href: '#booking' },
  { id: 'weight-support', name: 'Mental gastric bypass', description: 'A specialist weight-related hypnosis enquiry. Discuss the approach and suitability with Jody.', price: 'Enquire for pricing.', href: '#booking' },
] as const;

export const sessionSteps = [
  { number: '01', title: 'A 90-minute whole-life analysis', description: 'Begin with a 90-minute analysis so Jody can understand the circumstances around your concern.' },
  { number: '02', title: 'Hypnosis and your recording', description: 'Hypnosis follows the analysis, with a personal recording made on your phone.' },
  { number: '03', title: 'Continue at home', description: 'Jody asks clients to listen to their recording at bedtime for at least 21 nights.' },
] as const;

export const sessionFacts = {
  duration: 'A 90-minute whole-life analysis is followed by hypnosis and your personal recording. Confirm the total appointment time with Jody.',
  analysisDurationMinutes: 90,
  hypnosisPrice: '$250 AUD',
  quitSmokingPrice: 'Higher than the standard $250 session; enquire for the exact price.',
  quitVapingPrice: 'Enquire for pricing.',
  mentalGastricBypassPrice: 'Enquire for pricing.',
  coaching: 'Monthly mentoring packages; enquire for pricing.',
  payment: 'No upfront payment.',
  cancellation: 'Cancellations within 24 hours incur half the session fee.',
  booking: 'Submit a session request. Jody confirms the appointment with you.',
  care: 'Hypnotherapy and coaching complement medical and psychological care. Individual experiences vary.',
} as const;

export const book = {
  title: 'Live Sexy Now',
  author: brand.name,
  status: 'Coming soon',
  themes: ['Confidence', 'Reinvention', 'Feeling at home in yourself'],
  description: 'A forthcoming book by Jody Pockran about confidence and reinvention.',
  coverDirection: 'Burgundy and gold, showing Jody beside a horse in a landscape.',
  cta: 'Join the book list',
  href: '#book-list',
} as const;

export const beyond = [
  {
    id: 'podcast', title: 'A conversation for every chapter', label: 'The podcast', status: 'In production',
    description: 'Planned as one episode per chapter of Live Sexy Now, with a guest joining Jody for each conversation. Production is at Daniel’s studio.',
    image: '/images/microphone-lights.webp',
    href: '#contact',
    cta: 'Enquire about the podcast',
  },
  {
    id: 'speaking', title: 'Room for a new perspective', label: 'Speaking and commentating', status: 'Enquiries welcome',
    description: 'Speaking and commentating on confidence, mindset, reinvention and the equestrian world.',
    image: '/images/gold-microphone.webp',
    href: '#contact',
    cta: 'Invite Jody to speak',
  },
  {
    id: 'audio', title: 'A moment to return to yourself', label: 'Free audio', status: 'Coming soon',
    description: 'Four free recordings are being prepared: sleep, anxiety, depression and money rewiring. Join the email list for their release.',
    image: '/images/horse-sunset.webp',
    href: '#audio',
    cta: 'Join the audio list',
  },
] as const;

export const faqs = [
  { question: 'How does a hypnosis appointment work?', answer: 'Begin with a 90-minute whole-life analysis. Hypnosis follows, with a personal recording made on your phone. The analysis is one part of the appointment; confirm the total time with Jody.' },
  { question: 'What is the recording for?', answer: 'A personal recording is made on your phone during hypnosis. Jody asks clients to listen at bedtime for at least 21 nights.' },
  { question: 'How is coaching different?', answer: 'Life coaching is ongoing mentoring with shared goals and monthly check-ins. Hypnotherapy is offered as an individual session.' },
  { question: 'Is a request a confirmed booking?', answer: 'A form submission is a session request. Jody confirms the appointment with you. You can include preferred days and times.' },
  { question: 'What does it cost?', answer: 'A standard hypnosis session is $250 AUD. Quit smoking costs more. Enquire for quit vaping, mental gastric bypass, monthly coaching and other service prices.' },
  { question: 'Do I pay upfront?', answer: 'There is no upfront payment. Cancellations within 24 hours incur half the session fee.' },
  { question: 'Are the book, podcast and free audios available?', answer: 'Live Sexy Now is coming soon, the podcast is in production and the four free audios are being recorded. Join the book or audio list to register your interest.' },
] as const;

export const availability = {
  book: 'coming-soon',
  podcast: 'in-production',
  audio: 'coming-soon',
  bookingMethod: 'session-request',
  requestNeedsConfirmation: true,
} as const;

export const freeAudios = ['Sleep', 'Anxiety', 'Depression', 'Money rewiring'] as const;

// Planning reference only. These are not live offers, prices or campaigns.
export const futureScope = {
  membership: { status: 'future-concept', model: 'Freemium', indicativePrice: 'Approximately $9 per month' },
  campaigns: { status: 'planned', timing: 'New Year', count: '4–5', themes: ['Quit smoking', 'Weight-related hypnosis', 'Hypnosis', 'Life coaching'] },
} as const;

export const imageAssets = {
  portrait: { src: '/images/jody-portrait.webp', width: 923, height: 920, srcSet: '/images/jody-portrait-480.webp 480w, /images/jody-portrait-768.webp 768w, /images/jody-portrait.webp 923w', alt: 'Jody Pockran in a white blouse with a gold chain print.' },
  blackHorse: { src: '/images/black-horse.webp', width: 1536, height: 1024, srcSet: '/images/black-horse-640.webp 640w, /images/black-horse-960.webp 960w, /images/black-horse.webp 1536w', alt: 'A close portrait of a black horse.' },
  handsOnHorse: { src: '/images/hands-on-horse.webp', width: 1536, height: 1024, srcSet: '/images/hands-on-horse-640.webp 640w, /images/hands-on-horse-960.webp 960w, /images/hands-on-horse.webp 1536w', alt: 'Hands resting on a horse’s neck.' },
  wheat: { src: '/images/hand-wheat.webp', width: 1344, height: 896, srcSet: '/images/hand-wheat-640.webp 640w, /images/hand-wheat-960.webp 960w, /images/hand-wheat.webp 1344w', alt: 'A hand moving gently through golden wheat.' },
  goldenGrazing: { src: '/images/horses-golden-grazing.webp', width: 1920, height: 1280, srcSet: '/images/horses-golden-grazing-640.webp 640w, /images/horses-golden-grazing-960.webp 960w, /images/horses-golden-grazing.webp 1920w', alt: 'Horses grazing together in warm light.' },
  sunbeams: { src: '/images/sunbeams-horses.webp', width: 1920, height: 1280, srcSet: '/images/sunbeams-horses-640.webp 640w, /images/sunbeams-horses-960.webp 960w, /images/sunbeams-horses.webp 1920w', alt: 'Wild horses grazing beneath trees and morning sunbeams.' },
  treeLight: { src: '/images/horse-tree-light.webp', width: 1920, height: 1280, srcSet: '/images/horse-tree-light-640.webp 640w, /images/horse-tree-light-960.webp 960w, /images/horse-tree-light.webp 1920w', alt: 'A horse in a paddock beneath sunlit trees.' },
  sunsetHorse: { src: '/images/horse-sunset.webp', width: 1536, height: 952, srcSet: '/images/horse-sunset-640.webp 640w, /images/horse-sunset-960.webp 960w, /images/horse-sunset.webp 1536w', alt: 'A horse silhouetted against the sunset.' },
  microphone: { src: '/images/gold-microphone.webp', width: 1344, height: 893, srcSet: '/images/gold-microphone-640.webp 640w, /images/gold-microphone-960.webp 960w, /images/gold-microphone.webp 1344w', alt: 'A microphone in warm gold light.' },
  microphoneLights: { src: '/images/microphone-lights.webp', width: 1344, height: 896, srcSet: '/images/microphone-lights-640.webp 640w, /images/microphone-lights-960.webp 960w, /images/microphone-lights.webp 1344w', alt: 'A microphone with softly blurred lights behind it.' },
  rider: { src: '/images/rider-sunset.webp', width: 1536, height: 1028, srcSet: '/images/rider-sunset-640.webp 640w, /images/rider-sunset-960.webp 960w, /images/rider-sunset.webp 1536w', alt: 'A rider and horse silhouetted at sunset.' },
} as const;

export const siteContent = { brand, hero, chapters, services, hypnosisConcerns, specialistSessions, sessionSteps, sessionFacts, book, beyond, faqs, availability, freeAudios, futureScope, imageAssets } as const;
export default siteContent;
