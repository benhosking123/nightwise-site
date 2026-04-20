'use client';
import Script from 'next/script';

export default function GoogleMapsLoader({ apiKey }: { apiKey: string }) {
  return (
    <>
      <Script id="gm-callback" strategy="beforeInteractive">
        {`window.__gmInit = function() { window.__gmReady = true; };`}
      </Script>
      <Script
        id="gm-api"
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=__gmInit`}
        strategy="afterInteractive"
        onLoad={() => { (window as any).__gmReady = true; }}
      />
    </>
  );
}
