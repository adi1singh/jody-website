/** Only add approved Jody assets, destinations and testimonials here. */
export const siteConfig = {
  bookingUrl: "",
  introVideoUrl: "",
  bookCoverUrl: "/images/live-sexy-now-cover.webp",
  portrait: "jody-portrait",
  // Jody's own photo with her horse for the equestrian chapter (e.g.
  // "/images/jody-black-horse.webp"). Blank shows an illustrative horse photo.
  jodyWithHorse: "",
  // Jody's own photo for "Meet Jody" (e.g. Jody hugging her chestnut horse).
  // Blank shows an illustrative photo, so the hero portrait isn't repeated.
  meetJodyPhoto: "",
  socials: [
    { name: "Instagram", url: "" },
    { name: "Facebook", url: "" },
    { name: "TikTok", url: "" },
    { name: "YouTube", url: "" },
    { name: "LinkedIn", url: "" },
  ],
  // Approved public reel links can be displayed here. A continuously refreshed
  // Instagram feed needs Jody's account/provider connection before launch.
  reels: [] as { title: string; url: string; thumbnail: string }[],
  testimonials: [] as { quote: string; name: string; context?: string }[],
  trustLogos: [] as { name: string; image: string; url?: string }[],
};
