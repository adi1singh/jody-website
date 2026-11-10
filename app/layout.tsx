import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";
import "./lead-experience.css";
import "./premium.css";
import "./chapters.css";
import { INTRO_SCRIPT } from "./intro-script";
export const metadata: Metadata = {
  metadataBase: new URL("https://jody-a-life-in-chapters.jobgen-ai.chatgpt.site"),
  title: "Jody Pockran — A Life in Chapters",
  description: "Personal hypnotherapy with Jody Pockran, alongside monthly life coaching, equestrian mindset and her forthcoming book, Live Sexy Now. Change the story. Change your life.",
  openGraph: { title: "Jody Pockran — A Life in Chapters", description: "Hypnotherapy, life coaching & the courage to begin again.", type: "website", images: [{url:"/images/jody-portrait.webp",width:923,height:920,alt:"Jody Pockran"}] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} /><link rel="preload" href="/images/fonts/cormorant.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/images/fonts/manrope.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}</body></html>;
}
