import { useState } from "react";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import gfm from "remark-gfm";
import { ExternalLink } from "react-feather";

import readmes from "./data/readmes";

import Header from "./components/Header";

export default function App() {
  const [selectedReadme, setSelectedReadme] = useState(false);

  const handleData = (response, readmeObject) => {
    const encodedContent = response.content;
    const decodedContent = decodeURIComponent(
      atob(encodedContent)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    setSelectedReadme({
      ...readmeObject,
      content: decodedContent,
    });
  };

  const handlePreviewClick = (readme, event) => {
    event.stopPropagation();

    return fetch(readme.APIurl)
      .then((result) => result.json())
      .then((response) => handleData(response, readme))
      .catch((err) => console.log(err));
  };

  const copyMarkdownToClipboard = (readmeContent, event) => {
    const el = document.createElement("textarea");
    el.value = readmeContent;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <>
      <Header />
      <main className="flex justify-center mx-auto">
        <section className="w-full max-w-2xl text-gray-700">
          <div className="container px-5 pb-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {readmes.length
                ? readmes
                    .sort((a, b) => (a.owner > b.owner ? 1 : b.owner > a.owner ? -1 : 0))
                    .map((readme) => {
                      return (
                        <article
                          key={readme.APIurl}
                          onClick={(e) => {
                            handlePreviewClick(readme, e);
                          }}
                          className="w-full p-4"
                        >
                          <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="tracking-widest text-blue-500 text-xs uppercase">built by</h3>
                            <a className="text-lg text-gray-300 mb-4 inline-flex items-center hover:text-gray-600" href={readme.ownerLink} target="_blank" rel="noreferrer noopener">
                              <span className="text-gray-700">{readme.owner}</span>
                              <ExternalLink size={16} className="ml-2 transition-colors" />
                            </a>
                            <div className="flex justify-center md:justify-end">
                              <button
                                onClick={(e) => {
                                  handlePreviewClick(readme, e);
                                }}
                                className="inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded-full leading-tight"
                              >
                                Preview
                              </button>
                              <a className="ml-4 inline-flex text-gray-500 border-0 py-2 px-6 focus:outline-none hover:text-gray-700 rounded-full leading-tight" href={readme.githubLink} target="_blank" rel="noreferrer noopener">
                                View on GitHub
                              </a>
                            </div>
                          </div>
                        </article>
                      );
                    })
                : null}
            </div>
          </div>
        </section>
        <aside className={selectedReadme ? "w-1/2 container px-5 pb-24 opacity-100 transition-all duration-500" : "w-0 opacity-0	transition-all duration-500"}>
          {selectedReadme ? (
            <article className="bg-white p-6 rounded-lg shadow-lg">
              <div className="-mx-6 -mt-6 mb-4 px-6 py-4 bg-gray-100 flex justify-end items-center sticky top-0">
                <h2 className="tracking-widest text-blue-500 text-xs uppercase">
                  Built by:&nbsp;
                  <a className="hover:underline" href={selectedReadme.ownerLink} target="_blank" rel="noreferrer noopener">
                    {selectedReadme.owner}
                  </a>
                </h2>
                <button
                  onClick={(e) => {
                    console.log(selectedReadme.content);
                    copyMarkdownToClipboard(selectedReadme.content, e);
                  }}
                  className="ml-6 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded-full leading-tight"
                >
                  Copy markdown
                </button>
              </div>
              <ReactMarkdownWithHtml className="markdown-body" plugins={[gfm]} children={selectedReadme.content} allowDangerousHtml />
            </article>
          ) : null}
        </aside>
      </main>
    </>
  );
}
