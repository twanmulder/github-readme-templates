import { useState } from "react";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import gfm from "remark-gfm";
import { ExternalLink, GitHub, Clipboard } from "react-feather";
import { Toaster } from "react-hot-toast";

import { decodeFromBase64ToUTF8, copyStringToClipboard } from "./utils/utils";
import readmes from "./data/readmes";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [allReadmes, setAllReadmes] = useState(
    readmes.map((readme) => {
      return {
        ...readme,
        active: false,
        content: false,
      };
    })
  );
  const selectedReadme = allReadmes.find((readme) => readme.active) || false;

  const handleData = (response, readmeObject) => {
    const encodedContent = response.content;
    const decodedContent = decodeFromBase64ToUTF8(encodedContent);

    // Update the content of the matching readme and set it to active
    const updatedReadme = { ...readmeObject, content: decodedContent, active: true };
    const updatedReadmes = allReadmes.map((el) => (el.APIurl === updatedReadme.APIurl ? updatedReadme : { ...el, active: false }));
    setAllReadmes(updatedReadmes);
  };

  const handlePreviewClick = (readme) => {
    // No need to fetch new data when its already present
    if (readme.content) {
      // Set all readmes active to false and set the selected one to true
      const updatedReadmes = allReadmes.map((el) => (el.APIurl === readme.APIurl ? { ...readme, active: true } : { ...el, active: false }));
      setAllReadmes(updatedReadmes);
    }

    // Fetch data if readme doesn't have a content key
    return fetch(readme.APIurl)
      .then((result) => result.json())
      .then((response) => handleData(response, readme))
      .catch((err) => console.log(err));
  };

  const handleMarkdownCopyClick = (readme) => {
    if (readme.content) {
      return copyStringToClipboard(readme.content);
    }

    fetch(readme.APIurl)
      .then((result) => result.json())
      .then((response) => decodeFromBase64ToUTF8(response.content))
      .then((decodedContent) => {
        const updatedReadmes = allReadmes.map((el) => (el.APIurl === readme.APIurl ? { ...readme, content: decodedContent } : el));
        setAllReadmes(updatedReadmes);
        copyStringToClipboard(decodedContent);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <main className="flex justify-center mx-auto">
        <section className="w-full max-w-2xl text-gray-700">
          <div className="container px-5 pb-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {allReadmes.length
                ? allReadmes
                    .sort((a, b) => (a.owner > b.owner ? 1 : b.owner > a.owner ? -1 : 0))
                    .map((readme) => {
                      return (
                        <article key={readme.APIurl} className="w-full p-4">
                          <div className={readme.active ? "active bg-white p-6 rounded-lg shadow-lg border border-blue-500" : "bg-white p-6 rounded-lg shadow-lg border border-gray-100"}>
                            <h3 className="tracking-widest text-blue-500 text-xs uppercase">built by</h3>
                            <a className="text-lg text-gray-500 mb-4 inline-flex items-center hover:text-gray-700" href={readme.ownerLink} target="_blank" rel="noreferrer noopener">
                              <span className="text-gray-900">{readme.owner}</span>
                              <ExternalLink size={16} className="ml-2 transition-colors" />
                            </a>
                            <div className="flex justify-center md:justify-end">
                              <button
                                onClick={() => {
                                  handlePreviewClick(readme);
                                }}
                                className="inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded-full leading-tight transition-colors"
                              >
                                Preview
                              </button>
                              <button
                                onClick={() => {
                                  handleMarkdownCopyClick(readme);
                                }}
                                className="ml-6 inline-flex items-center text-gray-400 hover:text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded-full leading-tight transition-colors"
                              >
                                <Clipboard size={16} className="mr-2" />
                                <span className="text-gray-700">Copy markdown</span>
                              </button>
                              <a className="ml-4 inline-flex items-center text-gray-500 border-0 py-2 px-6 focus:outline-none hover:text-gray-700 rounded-full leading-tight transition-colors" href={readme.githubLink} target="_blank" rel="noreferrer noopener">
                                <GitHub size={16} className="mr-2" />
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
        <aside className={selectedReadme.owner ? "w-1/2 container px-5 pb-24 opacity-100 transition translate-y-0 duration-500" : "w-0 opacity-0 transform translate-y-8 transition duration-500"}>
          {selectedReadme.owner ? (
            <article className="bg-white p-6 rounded-lg shadow-lg">
              <div className="-mx-6 -mt-6 mb-4 px-6 py-4 bg-gray-100 flex justify-end items-center sticky top-0 z-10">
                <h2 className="tracking-widest text-blue-500 text-xs uppercase">
                  Built by:&nbsp;
                  <a className="hover:underline" href={selectedReadme.ownerLink} target="_blank" rel="noreferrer noopener">
                    {selectedReadme.owner}
                  </a>
                </h2>
                <button
                  onClick={() => {
                    handleMarkdownCopyClick(selectedReadme);
                  }}
                  className="ml-6 inline-flex items-center text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded-full leading-tight transition-colors"
                >
                  <Clipboard size={16} className="mr-2 text-gray-400" />
                  Copy markdown
                </button>
              </div>
              <ReactMarkdownWithHtml className="markdown-body" plugins={[gfm]} children={selectedReadme.content} allowDangerousHtml />
            </article>
          ) : null}
        </aside>
      </main>
      <Footer />
    </>
  );
}
