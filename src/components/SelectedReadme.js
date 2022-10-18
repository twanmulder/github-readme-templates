import ReactMarkdownWithHtml from "react-markdown/with-html";
import gfm from "remark-gfm";
import { Clipboard } from "react-feather";

import Gradientsvg from "./Gradientsvg";

export default function SelectedReadme(props) {
  const { selectedReadme } = props;

  return (
    <article className="markdown bg-white px-6 pb-6 rounded-lg shadow-lg border border-gray-100 h-screen sticky top-4 overflow-scroll">
      <div className="markdown-header -mx-6 mb-6 px-6 py-4 bg-gray-50 bg-opacity-75	flex justify-end items-center sticky top-0 z-10">
        <h2 className="tracking-widest text-blue-500 text-xs uppercase">
          Built by:&nbsp;
          <a className="hover:underline" href={selectedReadme.ownerLink} target="_blank" rel="noreferrer noopener">
            {selectedReadme.owner}
          </a>
        </h2>
        <button
          onClick={() => {
            props.handleMarkdownCopyClick(selectedReadme);
          }}
          className="ml-6 inline-flex items-center text-gray-400 active:text-gray-700 bg-gray-200 hover:bg-gray-100 active:bg-gray-300 border-0 py-2 px-6 focus:outline-none rounded-full leading-tight transform-gpu hover:-translate-y-px active:translate-y-px transition"
        >
          <Clipboard size={16} className="mr-2" />
          <span className="text-gray-700">Copy markdown</span>
        </button>
      </div>
      <ReactMarkdownWithHtml
        className="markdown-body -mb-8"
        plugins={[gfm]}
        children={selectedReadme.content}
        allowDangerousHtml
      />
      <Gradientsvg />
    </article>
  );
}
