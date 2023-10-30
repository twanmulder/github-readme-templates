import { ExternalLink, GitHub, Clipboard } from "react-feather";

// const infoForAds = [
//   {
//     title: "Headers that get you more followers. Made in seconds",
//     ctaText: "Start designing for free (no account needed)",
//     href: "https://headers.me?referrer=readme-templates.com",
//     tracking: "headers",
//   },
//   {
//     title: "Your Website Sucks. And I'll Help You Fix It",
//     ctaText: "Read The Free Sample Chapter",
//     href: "https://flurly.com/p/your-website-sucks?referrer=readme-templates.com",
//     tracking: "ebook",
//   },
// ];

// const renderAd = (index) => {
//   return (
//     <article className="w-full p-4">
//       <div className="active bg-blue-600 p-6 rounded-lg shadow-lg border border-blue-300">
//         <h3 className="tracking-widest text-white text-xs uppercase">advertisement</h3>
//         <a
//           target="_blank"
//           rel="noreferrer noopener"
//           href={infoForAds[index].href}
//           data-splitbee-event={`open-${infoForAds[index].tracking}-ad`}
//           className="text-lg text-white mb-6 md:mb-4 inline-flex items-center hover:opacity-80"
//         >
//           <span className="opacity-90">{infoForAds[index].title}</span>
//           <ExternalLink size={16} className="ml-2 transition-colors" />
//         </a>
//         <div className="flex flex-col	md:flex-row justify-center md:justify-end">
//           <a
//             target="_blank"
//             rel="noreferrer noopener"
//             href={infoForAds[index].href}
//             data-splitbee-event={`open-${infoForAds[index].tracking}-ad`}
//             className="hidden md:inline-flex items-center text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-700 border-0 py-2 px-6 focus:outline-none rounded-full leading-tight transform-gpu hover:-translate-y-px active:translate-y-px transition"
//           >
//             <ExternalLink size={16} className="mr-2" />
//             <span>{infoForAds[index].ctaText}</span>
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// };

const renderReadme = (readme, index, props) => {
  return (
    <article key={readme.APIurl} className="w-full p-4">
      <div
        className={
          readme.active
            ? "active bg-white p-6 rounded-lg shadow-lg border border-blue-300"
            : "bg-white p-6 rounded-lg shadow-lg border border-gray-100"
        }
      >
        <h3 className="tracking-widest text-blue-600 text-xs uppercase">built by</h3>
        <a
          target="_blank"
          href={readme.ownerLink}
          rel="noreferrer noopener"
          className="text-lg text-gray-500 mb-6 md:mb-4 inline-flex items-center hover:text-gray-700"
        >
          <span className="text-gray-900">{readme.owner}</span>
          <ExternalLink size={16} className="ml-2 transition-colors" />
        </a>
        <div className="flex flex-col	md:flex-row justify-center md:justify-end">
          <button
            onClick={() => {
              props.handlePreviewClick(readme);
            }}
            className="hidden md:inline-flex items-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 border-0 py-2 px-6 focus:outline-none rounded-full leading-tight transform-gpu hover:-translate-y-px active:translate-y-px transition"
          >
            <span>Preview</span>
          </button>
          <button
            onClick={() => {
              props.handleMarkdownCopyClick(readme);
            }}
            className="md:ml-6 text-sm md:text-base inline-flex items-center justify-center text-gray-400 active:text-gray-700 bg-gray-200 hover:bg-gray-100 active:bg-gray-300 border-0 py-2 px-4 md:px-6 focus:outline-none rounded-full leading-tight transform-gpu hover:-translate-y-px active:translate-y-px transition"
          >
            <Clipboard size={16} className="mr-2" />
            <span className="text-gray-700">Copy markdown</span>
          </button>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={readme.githubLink}
            className="mt-2 md:mt-0 md:ml-4 text-sm md:text-base inline-flex items-center justify-center text-gray-500 border-0 py-2 px-4 md:px-6 focus:outline-none hover:text-gray-700 rounded-full leading-tight transition-colors"
          >
            <GitHub size={16} className="mr-2" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default function ReadmeList(props) {
  // Sort all readme's alphabetically on owner's name
  const readmes = props.allReadmes.sort((a, b) => (a.owner > b.owner ? 1 : b.owner > a.owner ? -1 : 0));

  // Render all Readme's
  const renderedReadmes = readmes.map((readme, index) => {
    return renderReadme(readme, index, props);
  });

  // Add ads
  // renderedReadmes.splice(2, 0, renderAd(0));
  // renderedReadmes.splice(12, 0, renderAd(1));

  return renderedReadmes;
}
