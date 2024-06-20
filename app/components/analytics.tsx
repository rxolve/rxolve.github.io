import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as gtag from "@/lib/gtag";

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    gtag.initGA();
  }, []);

  useEffect(() => {
    gtag.logPageView(pathname);
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
    </>
  );
};

export default Analytics;
