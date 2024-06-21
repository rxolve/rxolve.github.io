import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-PLPX1ZCMEL";

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID);
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);

  return (
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
  );
};

export default Analytics;
