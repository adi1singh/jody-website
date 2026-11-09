/**
 * Factual source: https://jody-website.vercel.app/ (reviewed 9 November 2026).
 * Chapter titles reflect the new storybook direction. Biography and service facts
 * below are taken from the existing site; no personal timeline, testimonials,
 * outcomes, dates, credentials or service locations have been invented.
 */

export const brand = {
  name: 'Jody Pockran',
  role: 'Hypnotherapist · Life coach · Equestrian mindset coach',
  email: 'jannpockran@gmail.com',
  emailHref: 'mailto:jannpockran@gmail.com',
  enquiryHref: 'mailto:jannpockran@gmail.com?subject=A%20session%20with%20Jody',
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
  description: 'Hypnotherapy, life coaching and a different way forward.',
  cta: 'Begin the story',
  href: '#story',
  image: '/images/jody-portrait.webp',
} as const;

export const chapters = [
  {
    id: 'story', number: 'I', navLabel: 'The story',
    title: 'A life, still unfolding.',
    description: 'Meet Jody: a hypnotherapist and life coach whose approach begins with the whole person, not only the concern they bring.',
    image: '/images/jody-portrait.webp',
    imageAlt: 'Jody Pockran in a white blouse with a gold chain print.',
  },
  {
    id: 'work', number: 'II', navLabel: 'The work',
    title: 'A different way forward.',
    description: 'Personal hypnotherapy and ongoing life coaching, shaped around your circumstances and goals.',
    image: '/images/hand-wheat.webp',
    imageAlt: 'A hand brushing through a sunlit field of wheat.',
  },
  {
    id: 'equestrian', number: 'III', navLabel: 'The connection',
    title: 'Find your stride.',
    description: 'Equestrian mindset coaching for riders and competitors, with a focus on nerves, concentration and confidence in competition.',
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
    description: 'Conversations, speaking and recordings that continue the work beyond a session.',
    image: '/images/gold-microphone.webp',
    imageAlt: 'A microphone lit by warm light.',
  },
  {
    id: 'contact', number: 'VI', navLabel: 'Your next chapter',
    title: 'Your next chapter.',
    description: 'Tell Jody what you have in mind. She will reply personally to talk through the next step.',
    cta: 'Write to Jody',
    href: brand.enquiryHref,
  },
] as const;

export const services = [
  {
    id: 'hypnotherapy',
    name: 'Hypnotherapy',
    description: 'A personal session beginning with a whole-life discussion, followed by hypnosis and your own recording.',
    format: 'Individual session',
    price: '$250 AUD',
    note: 'Quit smoking and vaping sessions are priced separately.',
    href: brand.enquiryHref,
  },
  {
    id: 'coaching',
    name: 'Life coaching',
    description: 'Ongoing mentoring with goals agreed together and regular monthly check-ins.',
    format: 'Monthly packages',
    price: 'Enquire for pricing',
    href: 'mailto:jannpockran@gmail.com?subject=Life%20coaching%20enquiry',
  },
  {
    id: 'equestrian',
    name: 'Equestrian mindset',
    description: 'Mindset coaching for riders and competitors working on nerves, focus and competition confidence.',
    format: 'By enquiry',
    price: 'Enquire for pricing',
    href: 'mailto:jannpockran@gmail.com?subject=Equestrian%20mindset%20enquiry',
  },
] as const;

export const sessionSteps = [
  { number: '01', title: 'A conversation about you', description: 'Begin with a whole-life discussion so Jody can understand the circumstances around your concern.' },
  { number: '02', title: 'Your personal session', description: 'Hypnosis is tailored to you. A personal recording is made during the session.' },
  { number: '03', title: 'Continue at home', description: 'Jody asks clients to listen to their recording at bedtime for at least 21 nights.' },
] as const;

export const sessionFacts = {
  duration: 'Allow at least 90 minutes.',
  hypnosisPrice: '$250 AUD',
  smokingAndVapingPrice: 'By enquiry; priced separately.',
  coaching: 'Monthly mentoring packages; enquire for pricing.',
  payment: 'No upfront payment.',
  cancellation: 'Cancellations within 24 hours incur half the session fee.',
  booking: 'Email Jody to arrange a session.',
  care: 'Hypnotherapy and coaching complement medical and psychological care. Individual experiences vary.',
} as const;

export const book = {
  title: 'Live Sexy Now',
  author: brand.name,
  status: 'Coming soon',
  themes: ['Confidence', 'Reinvention', 'Feeling at home in yourself'],
  description: 'A forthcoming book by Jody Pockran about confidence and reinvention.',
  cta: 'Ask about the book',
  href: 'mailto:jannpockran@gmail.com?subject=Live%20Sexy%20Now%20book%20updates',
} as const;

export const beyond = [
  {
    id: 'podcast', title: 'A conversation for every chapter', label: 'The podcast', status: 'In production',
    description: 'Planned conversations expanding on the book, with guests sharing their own experiences.',
    image: '/images/microphone-lights.webp',
    href: 'mailto:jannpockran@gmail.com?subject=Podcast%20enquiry',
    cta: 'Enquire about the podcast',
  },
  {
    id: 'speaking', title: 'Room for a new perspective', label: 'Speaking', status: 'Enquiries welcome',
    description: 'Talks and commentary on confidence, mindset and reinvention for events, teams and the equestrian world.',
    image: '/images/gold-microphone.webp',
    href: 'mailto:jannpockran@gmail.com?subject=Speaking%20enquiry',
    cta: 'Invite Jody to speak',
  },
  {
    id: 'audio', title: 'A moment to return to yourself', label: 'Free audio', status: 'Coming soon',
    description: 'Four recordings are being prepared, covering sleep, anxiety, feeling low and beliefs about money.',
    image: '/images/horse-sunset.webp',
    href: 'mailto:jannpockran@gmail.com?subject=Free%20audio%20updates',
    cta: 'Ask for audio updates',
  },
] as const;

export const faqs = [
  { question: 'How long should I allow?', answer: 'Allow at least 90 minutes for a hypnosis appointment, beginning with a whole-life discussion.' },
  { question: 'What is the recording for?', answer: 'A personal recording is made during the session. Jody asks clients to listen at bedtime for at least 21 nights.' },
  { question: 'How is coaching different?', answer: 'Life coaching is ongoing mentoring with shared goals and monthly check-ins. Hypnotherapy is offered as an individual session.' },
  { question: 'How do I arrange a session?', answer: 'Email Jody with a little about what you are looking for. She will reply personally to arrange the next step.' },
  { question: 'Do I pay upfront?', answer: 'There is no upfront payment. Cancellations within 24 hours incur half the session fee.' },
] as const;

export const availability = {
  book: 'coming-soon',
  podcast: 'in-production',
  audio: 'coming-soon',
  bookingMethod: 'email',
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

export const siteContent = { brand, hero, chapters, services, sessionSteps, sessionFacts, book, beyond, faqs, availability, imageAssets } as const;
export default siteContent;
