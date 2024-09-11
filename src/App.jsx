import { useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PinataSDK } from "pinata";
import { SpecialZoomLevel, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

function App() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef(null);

  const pinata = new PinataSDK({
    pinataJwt: `${import.meta.env.VITE_JWT}`,
    pinataGateway: `${import.meta.env.VITE_GATEWAY}`,
  });

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  async function upload() {
    try {
      const upload = await pinata.upload.file(file);
      console.log(upload.cid);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch data from pinata
  useEffect(() => {
    const fetch = async () => {
      const url = await pinata.gateways.createSignedURL({
        cid: `${import.meta.env.VITE_DUMMY}`,
        expires: 1800,
      });
      setUrl(url);
      console.log(url);
    };
    fetch();
  }, []);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();

  const handleFullscreen = () => {
    if (viewerRef.current) {
      if (!document.fullscreenElement) {
        viewerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="w-screen">
      <div className="grid grid-cols-4 gap-8">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
       
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type="file" onChange={changeHandler} />
        <button onClick={() => upload()}>Submit</button>
        <button onClick={handleFullscreen}>
          {isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* pdf viewwer */}
      <div
        className="w-screen h-screen hidden"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "auto",
        }}
        ref={viewerRef}
      >
        {url && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              defaultScale={SpecialZoomLevel.PageFit}
              fileUrl={url}
              plugins={[defaultLayoutPluginInstance]}
              style={{ width: "100%", height: "100%" }}
            />
          </Worker>
        )}
      </div>
    </div>
  );
}

export default App;
