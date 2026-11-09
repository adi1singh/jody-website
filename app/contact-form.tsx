"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import LeadForm, { resolveLeadInterest } from "./lead-form";
import type { LeadInterest } from "../lib/lead-contract";

function subscribeToCampaign(change: () => void) {
  window.addEventListener("popstate", change);
  return () => window.removeEventListener("popstate", change);
}
function campaignInterest(): LeadInterest {
  return resolveLeadInterest(new URLSearchParams(window.location.search).get("interest")) ?? "General enquiry";
}

export default function ContactForm() {
  const campaign = useSyncExternalStore(subscribeToCampaign, campaignInterest, () => "General enquiry" as LeadInterest);
  const [chosen, setChosen] = useState<LeadInterest | null>(null);
  useEffect(() => {
    const campaignQuery = () => new URLSearchParams(window.location.search).get("interest");
    let previousCampaign = campaignQuery();
    const choose = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLElement>("[data-interest]");
      const interest = resolveLeadInterest(link?.dataset.interest);
      if (interest) {
        previousCampaign = campaignQuery();
        setChosen(interest);
      }
    };
    const resetChoice = () => {
      const nextCampaign = campaignQuery();
      // Hash navigation also emits popstate. Keep a service-link choice unless
      // the campaign's interest query actually changed in browser history.
      if (nextCampaign !== previousCampaign) setChosen(null);
      previousCampaign = nextCampaign;
    };
    document.addEventListener("click", choose);
    window.addEventListener("popstate", resetChoice);
    return () => {
      document.removeEventListener("click", choose);
      window.removeEventListener("popstate", resetChoice);
    };
  }, []);
  return <div className="lead-contact-form"><LeadForm kind="enquiry" interest={chosen ?? campaign} source="website-contact" title="A note to Jody." buttonLabel="Send your enquiry" /></div>;
}
