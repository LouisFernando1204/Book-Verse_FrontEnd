import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import LoadingScreen from "../ui/loading-screen";

const Layout = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    })

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <Navbar />
            <BackgroundBeamsWithCollision className="min-h-screen h-full w-full flex flex-col items-center justify-start">
                <Outlet />
            </BackgroundBeamsWithCollision>
            <Footer />
        </>
    );
};

export default Layout;