import { PillarPage, PillarHero, Section, Steps, Offers, Reviews, BookBand } from "../pillar";

export const metadata = {
  title: "Life coaching with Jody Pockran",
  description: "Monthly life coaching and mentoring with Jody Pockran: shared goals, honest support and momentum.",
};

export default function LifeCoaching() {
  return <PillarPage>
    <PillarHero
      eyebrow="Pillar two · Life coaching"
      title={<>Mentoring,<br /><em>with momentum.</em></>}
      lead="Ongoing coaching for the life you want next: clear goals, monthly support and someone in your corner. A practical space to work on your direction, separate from therapy."
      image={{ src: "/images/rider-sunset.webp", srcSet: "/images/rider-sunset-640.webp 640w, /images/rider-sunset-960.webp 960w, /images/rider-sunset.webp 1536w", alt: "Illustrative image: a rider at sunset" }}
      primary={{ label: "Book a coaching call", href: "/book-a-session?interest=Life%20coaching" }}
      secondary={{ label: "How it works", href: "#how" }}
      facts={["Monthly mentoring", "Shared goals", "Enquire for pricing"]}
    />
    <Section id="how" eyebrow="How it works" title={<>Small steps.<br /><em>Real change.</em></>}>
      <Steps items={[
        { title: "Where you are", text: "We start with an honest look at your life today, and what you want more and less of." },
        { title: "Where you’re going", text: "Together we set goals that feel like yours, not anyone else’s." },
        { title: "Every month", text: "Regular sessions keep you moving, with support when life gets in the way." },
      ]} />
    </Section>
    <Section tone="champagne" eyebrow="Ways to work together" title={<>Coaching that<br /><em>fits your life.</em></>}>
      <Offers items={[
        { title: "Monthly life coaching", price: "Enquire for pricing", text: "Ongoing mentoring with shared goals and monthly sessions.", interest: "Life coaching" },
        { title: "Not sure yet?", text: "Tell Jody what’s on your mind and she’ll suggest where to start.", interest: "General enquiry", cta: "Ask Jody" },
      ]} />
    </Section>
    <Reviews pillar="coaching" />
    <BookBand line={<>Your next chapter <em>starts with a conversation.</em></>} interest="Life coaching" label="Book a coaching call" />
  </PillarPage>;
}
