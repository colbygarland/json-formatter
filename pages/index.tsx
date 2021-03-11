import Head from "next/head";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const textareaElement = useRef(null);

  useEffect(() => {
    // @ts-ignore
    textareaElement.current.focus();
  });

  return (
    <>
      <Head>
        <title>JSON Formatter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="px-10 shadow py-4 mb-6 absolute top-0 left-0 w-full z-10 bg-white">
        <h1 className="text-5xl">JSON Formatter</h1>
      </header>
      {error.length !== 0 && <div className="">{error}</div>}

      <div className="flex flex-col h-screen p-12">
        <textarea
          ref={textareaElement}
          placeholder="Paste in JSON"
          autoFocus={true}
          className="flex-1 bg-gray-100 w-full h-full p-10 mt-20"
          onChange={(text) => {
            try {
              var json = JSON.parse(text.target.value);
              const formattedJson = JSON.stringify(json, null, 2);
              setJson(formattedJson);
              navigator.clipboard.writeText(formattedJson);
            } catch (error) {
              console.error(error);
              setError("Please enter valid JSON");
            }
          }}
        ></textarea>
        <pre className="flex-1 h-full p-10 bg-gray-200">{json}</pre>
      </div>
    </>
  );
}
