import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://jody-a-life-in-chapters.jobgen-ai.chatgpt.site"),
  title: "Jody Pockran — A Life in Chapters",
  description: "Change the story. Change your life. Explore Jody Pockran’s world of hypnotherapy, life coaching, equestrian mindset and her forthcoming book, Live Sexy Now.",
  openGraph: { title: "Jody Pockran — A Life in Chapters", description: "Hypnotherapy, life coaching & the courage to begin again.", type: "website", images: [{url:"/images/jody-portrait.webp",width:923,height:920,alt:"Jody Pockran"}] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><head><link rel="preload" href="/images/fonts/cormorant.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/images/fonts/manrope.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body>{children}</body></html>;
}
