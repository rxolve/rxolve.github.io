import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_TRACKING_ID = "G-PLPX1ZCMEL";

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if ((window as any).gtag) {
        (window as any).gtag("config", GA_TRACKING_ID, {
          page_path: url,
        });
      }
    };
    handleRouteChange(pathname); // Initial page load
  }, [pathname]);

  useEffect(() => {
    const gtagScript = document.createElement("script");
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtagScript.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_TRACKING_ID, {
        page_path: window.location.pathname,
      });
    };
  }, []);

  return (
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
  );
};

export default Analytics;
