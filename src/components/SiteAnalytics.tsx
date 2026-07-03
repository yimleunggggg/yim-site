import Script from "next/script";
import { gaMeasurementId } from "@/lib/site-config";

/** GA4 — 仅在生产环境且已配置 NEXT_PUBLIC_GA_MEASUREMENT_ID 时加载 */
export function SiteAnalytics() {
  if (!gaMeasurementId || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          var host = location.hostname;
          if (host !== 'localhost' && host !== '127.0.0.1' && !host.endsWith('.local')) {
            gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
          }
        `}
      </Script>
    </>
  );
}
