import { PillarPage, PillarHero, Section, Offers, Reviews } from "../pillar";
import { AudioSignup } from "../lead-experience";

export const metadata = {
  title: "Free hypnosis audios & podcast · Jody Pockran",
  description: "Four free hypnosis audios from Jody Pockran (sleep, anxiety, low mood and money), the Live Sexy Now podcast and speaking.",
};

export default function Listen() {
  return <PillarPage>
    <PillarHero
      eyebrow="Pillar five · Listen"
      title={<>Listen free,<br /><em>feel lighter.</em></>}
      lead="Four free hypnosis audios for sleep, anxiety, low mood and money, the Live Sexy Now podcast, and Jody on stage."
      image={{ src: "/images/gold-microphone.webp", srcSet: "/images/gold-microphone-640.webp 640w, /images/gold-microphone-960.webp 960w, /images/gold-microphone.webp 1344w", alt: "Illustrative image: a gold microphone" }}
      primary={{ label: "Get the free audios", href: "#audio" }}
      secondary={{ label: "The podcast", href: "#podcast" }}
      facts={["Free", "Sleep · Anxiety · Low mood · Money", "Sent when ready"]}
    />
    <Section id="audio" eyebrow="Free audios" title={<>Pick one.<br /><em>Press play tonight.</em></>} intro="The audios are being recorded now. Choose the one you’d like and we’ll email it as soon as it’s ready.">
      <div className="p-audio"><AudioSignup source="listen-page" /></div>
    </Section>
    <Section id="podcast" tone="champagne" eyebrow="Podcast & speaking" title={<>Live Sexy Now,<br /><em>the podcast.</em></>} intro="One episode per chapter of the book, with guests, in production now. Jody also speaks on confidence, mindset and the equestrian world.">
      <Offers items={[
        { title: "Podcast updates", text: "Hear when the first episode is out.", interest: "Podcast and audios", cta: "Tell me when it’s live" },
        { title: "Invite Jody to speak", text: "Events, clubs, podcasts and commentating.", interest: "Speaking and commentating", cta: "Invite Jody" },
      ]} />
    </Section>
    <Reviews pillar="listen" title="Listeners say." />
  </PillarPage>;
}
