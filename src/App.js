import { useState } from "react";
import { ExternalLink, GitHub, Clipboard } from "react-feather";
import { Toaster } from "react-hot-toast";

import { decodeFromBase64ToUTF8, copyStringToClipboard } from "./utils/utils";
import readmes from "./data/readmes";

import Header from "./components/Header";
import SelectedReadme from "./components/SelectedReadme";
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
      document.querySelector(".markdown").scrollTop = 0;
    }

    // Fetch data if readme doesn't have a content key
    return fetch(readme.APIurl)
      .then((result) => result.json())
      .then((response) => handleData(response, readme))
      .then(() => (document.querySelector(".markdown").scrollTop = 0))
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
                          <div className={readme.active ? "active bg-white p-6 rounded-lg shadow-lg border border-blue-300" : "bg-white p-6 rounded-lg shadow-lg border border-gray-100"}>
                            <h3 className="tracking-widest text-blue-600 text-xs uppercase">built by</h3>
                            <a className="text-lg text-gray-500 mb-6 md:mb-4 inline-flex items-center hover:text-gray-700" href={readme.ownerLink} target="_blank" rel="noreferrer noopener">
                              <span className="text-gray-900">{readme.owner}</span>
                              <ExternalLink size={16} className="ml-2 transition-colors" />
                            </a>
                            <div className="flex flex-col	md:flex-row justify-center md:justify-end">
                              <button
                                onClick={() => {
                                  handlePreviewClick(readme);
                                }}
                                className="hidden md:inline-flex items-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 border-0 py-2 px-6 focus:outline-none rounded-full leading-tight transform-gpu hover:-translate-y-px active:translate-y-px transition"
                              >
                                <span>Preview</span>
                              </button>
                              <button
                                onClick={() => {
                                  handleMarkdownCopyClick(readme);
                                }}
                                className="md:ml-6 text-sm md:text-base inline-flex items-center justify-center text-gray-400 active:text-gray-700 bg-gray-200 hover:bg-gray-100 active:bg-gray-300 border-0 py-2 px-4 md:px-6 focus:outline-none rounded-full leading-tight transform-gpu hover:-translate-y-px active:translate-y-px transition"
                              >
                                <Clipboard size={16} className="mr-2" />
                                <span className="text-gray-700">Copy markdown</span>
                              </button>
                              <a
                                className="mt-2 md:mt-0 md:ml-4 text-sm md:text-base inline-flex items-center justify-center text-gray-500 border-0 py-2 px-4 md:px-6 focus:outline-none hover:text-gray-700 rounded-full leading-tight transition-colors"
                                href={readme.githubLink}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                <GitHub size={16} className="mr-2" />
                                <span>View on GitHub</span>
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
        <aside className={selectedReadme.owner ? "hidden md:block w-1/2 container px-5 pb-24 opacity-100 transition translate-y-0 duration-500" : "hidden md:block w-0 opacity-0 transform translate-y-8 transition duration-500"}>
          {selectedReadme.owner ? <SelectedReadme selectedReadme={selectedReadme} handleMarkdownCopyClick={handleMarkdownCopyClick} /> : null}
        </aside>
      </main>
      <Footer />
    </>
  );
}
