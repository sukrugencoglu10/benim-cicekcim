"use client";

import { useEffect } from "react";

// Google AdSense reklam birimi. ENV yoksa nazik bir yer tutucu gösterir.
export default function AdSlot({ slot, className = "" }: { slot?: string; className?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (client && slot) {
      try {
        // @ts-expect-error adsbygoogle global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* yoksay */
      }
    }
  }, [client, slot]);

  if (!client || !slot) {
    return (
      <div
        className={`container-x flex h-24 items-center justify-center rounded-lg border border-dashed border-line bg-cream text-xs uppercase tracking-widest text-muted/60 ${className}`}
      >
        Reklam Alanı
      </div>
    );
  }

  return (
    <div className={`container-x ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
