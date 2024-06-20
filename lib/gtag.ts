import ReactGA from "react-ga4";

export const GA_TRACKING_ID = "G-PLPX1ZCMEL";

// 초기화
export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

// 페이지 뷰 트래킹
export const logPageView = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

// 이벤트 트래킹 (옵션)
export const logEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value,
  });
};
