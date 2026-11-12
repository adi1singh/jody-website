import { PillarPage, PillarHero, Section, Steps, Offers, Reviews, BookBand, Faq } from "../pillar";

export const metadata = {
  title: "Hypnosis with Jody Pockran · Hypnotherapy",
  description: "Hypnotherapy with Jody Pockran: a 90-minute whole-life analysis, personalised hypnosis and your own recording for 21 nights. Standard session $250 AUD.",
};

export default function Hypnosis() {
  return <PillarPage>
    <PillarHero
      eyebrow="Pillar one · Hypnosis"
      title={<>Let go of what’s<br /><em>holding you back.</em></>}
      lead="Hypnotherapy for the patterns that keep returning: overwhelm, anxiety, low mood, phobias, old wounds and money blocks. Gentle, personal and at your pace."
      image={{ src: "/images/jody-portrait.webp", srcSet: "/images/jody-portrait-480.webp 480w, /images/jody-portrait-768.webp 768w, /images/jody-portrait.webp 923w", alt: "Jody Pockran, hypnotherapist", position: "50% 25%" }}
      primary={{ label: "Book hypnosis", href: "/book-a-session?interest=Hypnotherapy" }}
      secondary={{ label: "How a session works", href: "#how" }}
      facts={["$250 AUD standard session", "No upfront payment", "Your own recording to keep"]}
    />
    <Section id="how" eyebrow="Your session" title={<>Understand. Experience.<br /><em>Return.</em></>} intro="Every session is built around you, so it starts with listening.">
      <Steps items={[
        { title: "A 90-minute whole-life analysis", text: "Time to understand what brings you here, and the story underneath it." },
        { title: "Personalised hypnosis", text: "A calm, guided session shaped by what you shared, recorded on your phone." },
        { title: "Twenty-one nights", text: "Listen at bedtime for at least 21 nights, so the change has time to settle in." },
      ]} />
    </Section>
    <Section tone="champagne" eyebrow="What we work on" title={<>Sessions for<br /><em>what weighs on you.</em></>}>
      <Offers items={[
        { title: "Hypnotherapy", price: "$250 AUD", text: "Overwhelm, anxiety, low mood, phobias, childhood trauma or money blocks.", interest: "Hypnotherapy" },
        { title: "Quit smoking", price: "Priced above standard", text: "A dedicated session for leaving cigarettes behind.", interest: "Quit smoking" },
        { title: "Quit vaping", price: "Enquire for pricing", text: "Hypnosis for people ready to stop vaping.", interest: "Quit vaping" },
        { title: "Mental gastric bypass", price: "Enquire for pricing", text: "Weight-related hypnosis. Discuss the approach and suitability with Jody.", interest: "Mental gastric bypass" },
      ]} />
    </Section>
    <Reviews pillar="hypnosis" />
    <Section tone="pearl" eyebrow="Good to know" title={<>A few things<br /><em>you might wonder.</em></>}>
      <Faq items={[
        { q: "Will I be in control?", a: "Yes. Hypnosis is a relaxed, focused state. You hear everything and can stop at any time." },
        { q: "What does it cost?", a: "A standard session is $250 AUD. Quit smoking costs more; enquire about quit vaping and mental gastric bypass." },
        { q: "Do I pay upfront?", a: "No. Nothing is payable upfront. Cancellations within 24 hours incur half the session fee." },
        { q: "Does it replace medical care?", a: "No. Hypnotherapy can sit alongside medical or psychological care; it doesn’t replace it, and experiences differ." },
      ]} />
    </Section>
    <BookBand line={<>Ready to <em>begin again?</em></>} interest="Hypnotherapy" label="Book hypnosis" />
  </PillarPage>;
}
