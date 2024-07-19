import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactGA from "react-ga4";
import { supabase } from "@/lib/supabase";

const GA_TRACKING_ID = "G-PLPX1ZCMEL";

const Analytics = () => {
  const pathname = usePathname();

  const updateVisitorCount = async () => {
    const { data, error } = await supabase
      .from("visitors")
      .select("count")
      .eq("id", 1);

    if (error) {
      console.error(error);
      return;
    }

    const visitorCount = data[0].count;
    await supabase
      .from("visitors")
      .update({ count: visitorCount + 1, last_visited: new Date() })
      .eq("id", 1);
  };

  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID);
    updateVisitorCount();
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
