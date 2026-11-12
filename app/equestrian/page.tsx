import { PillarPage, PillarHero, Section, Steps, Offers, Reviews, BookBand } from "../pillar";

export const metadata = {
  title: "Equestrian mindset coaching · Jody Pockran",
  description: "Mindset coaching for riders and competitors with Jody Pockran: calm nerves, sharper focus and confidence in the saddle.",
};

export default function Equestrian() {
  return <PillarPage>
    <PillarHero
      eyebrow="Pillar three · Equestrian mindset"
      title={<>Ride with<br /><em>confidence.</em></>}
      lead="Mindset coaching for riders and competitors, from someone who lives it. Calm the nerves, sharpen your focus and rebuild trust after a fall, so you and your horse can perform as one."
      image={{ src: "/images/jody-black-horse.webp", srcSet: "/images/jody-black-horse-480.webp 480w, /images/jody-black-horse-768.webp 768w, /images/jody-black-horse.webp 1010w", alt: "Jody Pockran with her black horse", position: "50% 30%" }}
      primary={{ label: "Book rider coaching", href: "/book-a-session?interest=Equestrian%20mindset" }}
      secondary={{ label: "What we work on", href: "#how" }}
      facts={["For riders of every level", "Competition nerves", "Confidence after a fall"]}
    />
    <Section id="how" eyebrow="What we work on" title={<>Calm mind.<br /><em>Clear ride.</em></>}>
      <Steps items={[
        { title: "Competition nerves", text: "Arrive on the day with a steady mind, so months of training show up when it counts." },
        { title: "Confidence after a fall", text: "Rebuild trust in yourself and your horse, step by step, at your pace." },
        { title: "Focus and connection", text: "Quiet the noise so you and your horse can ride as one." },
      ]} />
    </Section>
    <Section tone="champagne" eyebrow="Ways to work together" title={<>For riders,<br /><em>clubs and events.</em></>}>
      <Offers items={[
        { title: "Rider mindset coaching", price: "Enquire for pricing", text: "One-to-one coaching for riders and competitors.", interest: "Equestrian mindset" },
        { title: "Speaking & commentating", price: "Enquire", text: "Jody speaks on confidence and mindset, and commentates in the equestrian world.", interest: "Speaking and commentating", cta: "Invite Jody" },
      ]} />
    </Section>
    <Reviews pillar="equestrian" />
    <BookBand line={<>Find your stride, <em>in and out of the saddle.</em></>} interest="Equestrian mindset" label="Book rider coaching" />
  </PillarPage>;
}
