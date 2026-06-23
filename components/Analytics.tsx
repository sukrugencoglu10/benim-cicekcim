import Script from "next/script";

// Google reklam/analitik script'leri — ilgili ENV doluysa otomatik yüklenir.
export default function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <>
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}');
            `}
          </Script>
        </>
      )}

      {adsense && (
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
        />
      )}
    </>
  );
}
