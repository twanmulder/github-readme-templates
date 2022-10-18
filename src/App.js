import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { decodeFromBase64ToUTF8, copyStringToClipboard } from "./utils/utils";
import readmes from "./data/readmes";

import Header from "./components/Header";
import ReadmeList from "./components/ReadmeList";
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
    const updatedReadmes = allReadmes.map((el) =>
      el.APIurl === updatedReadme.APIurl ? updatedReadme : { ...el, active: false }
    );
    setAllReadmes(updatedReadmes);
  };

  const handlePreviewClick = (readme) => {
    // No need to fetch new data when its already present
    if (readme.content) {
      // Set all readmes active to false and set the selected one to true
      const updatedReadmes = allReadmes.map((el) =>
        el.APIurl === readme.APIurl ? { ...readme, active: true } : { ...el, active: false }
      );
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
        const updatedReadmes = allReadmes.map((el) =>
          el.APIurl === readme.APIurl ? { ...readme, content: decodedContent } : el
        );
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
              {allReadmes.length ? (
                <ReadmeList
                  allReadmes={allReadmes}
                  handlePreviewClick={handlePreviewClick}
                  handleMarkdownCopyClick={handleMarkdownCopyClick}
                />
              ) : null}
            </div>
          </div>
        </section>
        <aside
          className={
            selectedReadme.owner
              ? "hidden md:block w-1/2 container px-5 pb-24 opacity-100 transition translate-y-0 duration-500"
              : "hidden md:block w-0 opacity-0 transform translate-y-8 transition duration-500"
          }
        >
          {selectedReadme.owner ? (
            <SelectedReadme selectedReadme={selectedReadme} handleMarkdownCopyClick={handleMarkdownCopyClick} />
          ) : null}
        </aside>
      </main>
      <Footer />
    </>
  );
}
