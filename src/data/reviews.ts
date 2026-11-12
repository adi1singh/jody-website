/**
 * SAMPLE reviews, written to show the layout. They are not real clients and
 * are labelled "Sample" on the page. Replace each one with a real review
 * (with the client's permission) before launch, then set SAMPLE_REVIEWS to
 * false so the label disappears.
 */
export const SAMPLE_REVIEWS = true;

export type Pillar = "hypnosis" | "coaching" | "equestrian" | "book" | "listen";
export type Review = { quote: string; name: string; context: string; pillar: Pillar };

export const reviews: Review[] = [
  { pillar: "hypnosis", name: "Sarah M.", context: "Hypnosis · anxiety", quote: "I walked in carrying years of worry and walked out lighter. Jody listened to my whole story first, and the recording became part of my bedtime. I feel like myself again." },
  { pillar: "hypnosis", name: "Daniel R.", context: "Hypnosis · quit smoking", quote: "Twenty years of smoking, and I'd tried everything. Jody's session was calm and practical, and I haven't wanted one since." },
  { pillar: "hypnosis", name: "Priya K.", context: "Hypnosis · money blocks", quote: "I didn't realise how much an old story about money was running my life. Jody helped me see it, and then let it go." },
  { pillar: "coaching", name: "Emma L.", context: "Monthly life coaching", quote: "Our monthly sessions gave me direction and someone in my corner. I changed careers this year, and I did it with confidence." },
  { pillar: "coaching", name: "Michelle T.", context: "Monthly life coaching", quote: "Warm, honest and wonderfully practical. Jody holds you to your goals without ever making you feel small." },
  { pillar: "equestrian", name: "Hannah W.", context: "Equestrian mindset · eventing", quote: "My nerves used to undo months of training on competition day. Now I ride into the arena calm and focused, and my horse feels the difference." },
  { pillar: "equestrian", name: "Olivia B.", context: "Equestrian mindset · after a fall", quote: "After my fall I was frightened to canter. Jody helped me rebuild my trust, step by step. We're back jumping." },
  { pillar: "book", name: "Rachel S.", context: "Early reader", quote: "Bold, funny and kind. It feels like Jody is sitting beside you, telling you it's not too late." },
  { pillar: "listen", name: "Kate P.", context: "Free sleep audio", quote: "I fall asleep before the audio ends, every night. Such a gentle voice." },
];

export const reviewsFor = (pillar?: Pillar) => pillar ? reviews.filter((r) => r.pillar === pillar) : reviews;
