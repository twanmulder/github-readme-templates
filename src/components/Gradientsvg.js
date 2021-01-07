export default function Gradientsvg() {
  return (
    <svg className="sticky -bottom-6 transform rotate-180" preserveAspectRatio="none" viewBox="0 0 10 30" width="100%" height="75">
      <defs>
        <linearGradient id="eased-gradient-gradient-standard-layout" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }}></stop>
          <stop offset="8.1%" style={{ stopColor: "white", stopOpacity: 0.987 }}></stop>
          <stop offset="15.5%" style={{ stopColor: "white", stopOpacity: 0.951 }}></stop>
          <stop offset="22.5%" style={{ stopColor: "white", stopOpacity: 0.896 }}></stop>
          <stop offset="29%" style={{ stopColor: "white", stopOpacity: 0.825 }}></stop>
          <stop offset="35.3%" style={{ stopColor: "white", stopOpacity: 0.741 }}></stop>
          <stop offset="47.1%" style={{ stopColor: "white", stopOpacity: 0.55 }}></stop>
          <stop offset="52.9%" style={{ stopColor: "white", stopOpacity: 0.45 }}></stop>
          <stop offset="58.8%" style={{ stopColor: "white", stopOpacity: 0.352 }}></stop>
          <stop offset="64.7%" style={{ stopColor: "white", stopOpacity: 0.259 }}></stop>
          <stop offset="71%" style={{ stopColor: "white", stopOpacity: 0.175 }}></stop>
          <stop offset="77.5%" style={{ stopColor: "white", stopOpacity: 0.104 }}></stop>
          <stop offset="84.5%" style={{ stopColor: "white", stopOpacity: 0.05 }}></stop>
          <stop offset="91.9%" style={{ stopColor: "white", stopOpacity: 0.013 }}></stop>
          <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }}></stop>
        </linearGradient>
      </defs>
      <mask id="eased-gradient-mask-standard-layout">
        <rect x="0" y="0" width="100%" height="100%" fill="url(#eased-gradient-gradient-standard-layout)"></rect>
      </mask>
      <rect x="0" y="0" width="100%" height="100%" mask="url(#eased-gradient-mask-standard-layout)" fill="#fff" style={{ transition: "fill 350ms ease 0s" }}></rect>
    </svg>
  );
}
