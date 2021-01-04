import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import readmes from "./data/readmes";

import Header from "./components/Header";
import Loading from "./components/Loading";

import { ExternalLink } from "react-feather";

export default function App() {
  const [loadedReadmes, setLoadedReadmes] = useState([]);

  const handleData = (response, readmeObject) => {
    const encodedContent = response.content;
    const decodedContent = atob(encodedContent);

    setLoadedReadmes([
      ...loadedReadmes,
      {
        ...readmeObject,
        content: decodedContent,
      },
    ]);
  };

  useEffect(() => {
    readmes.forEach((readme) => {
      return fetch(readme.APIurl)
        .then((result) => result.json())
        .then((response) => handleData(response, readme))
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <>
      <Header />
      <main className="">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {readmes.length
                ? readmes.map((readme) => {
                    return (
                      <article key={readme.APIurl} className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-px transition-all">
                          <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font uppercase">built by</h3>
                          <a className="text-lg text-gray-300 font-medium title-font mb-4 inline-flex items-center hover:text-gray-600" href={readme.ownerLink} target="_blank" rel="noreferrer noopener">
                            <span className="text-gray-900">{readme.owner}</span>
                            <ExternalLink size={16} className="ml-2 transition-colors" />
                          </a>
                          <div className="flex justify-center">
                            <button className="inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded-full leading-tight">Preview</button>
                            <a className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-full leading-tight" href={readme.githubLink} target="_blank" rel="noreferrer noopener">
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

        {/* {loadedReadmes.length ? (
          loadedReadmes.map((readme) => {
            return (
              <section key={readme.APIurl}>
                <p>{readme.APIurl}</p>
                <article className="markdown-body border bg-color-white p-8 rounded-lg">
                  <ReactMarkdown source={readme.content} />
                </article>
              </section>
            );
          })
        ) : (
          <Loading />
        )} */}
      </main>
    </>
  );
}
