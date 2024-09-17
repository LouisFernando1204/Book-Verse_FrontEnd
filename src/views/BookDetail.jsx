import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingScreen from "../components/ui/loading-screen";
import ErrorMessage from "../components/ui/error-message";

const BookDetail = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const fileUrl = query.get('file');

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const scrollModePluginInstance = scrollModePlugin();

    useEffect(() => {
        if (!fileUrl) {
            setErrorMessage('Oops.. There is no PDF file to show here!');
            setIsLoading(false);
        } else {
            setErrorMessage("");
            setIsLoading(false);
        }
    }, [fileUrl]);

    const handleLoadError = (error) => {
        console.error("Error loading PDF: ", error);
        setErrorMessage('Failed to load the PDF. Please check the file URL or try again later.');
        setIsLoading(false);
        console.log(errorMessage)
    };

    return (
        <div className="w-screen h-screen">
            {isLoading ? (
                <LoadingScreen />
            ) : errorMessage ? (
                <ErrorMessage errorCode={400} errorName={"Bad Request"} errorMessage={errorMessage} />
            ) : (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={fileUrl}
                        defaultScale={SpecialZoomLevel.PageFit}
                        plugins={[defaultLayoutPluginInstance, scrollModePluginInstance]}
                        style={{ width: "100%", height: "100%" }}
                        onLoadError={handleLoadError}
                    />
                </Worker>
            )}
        </div>
    );
};

export default BookDetail;