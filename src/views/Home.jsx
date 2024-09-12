/* eslint-disable no-unused-vars */
"use client"
import React, { useEffect, useId, useRef, useState, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";
import Section from "../components/ui/section";
import { CloseIcon } from "../components/ui/close-icon";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import ImageWithSkeleton from "../components/ui/image-with-skeleton";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";


const World = React.lazy(() => import("../components/ui/globe").then((m) => ({ default: m.World })));

const Home = () => {

    const placeholders = [
        "Search for a classic literature e-book...",
        "Find the latest best-sellers in digital format...",
        "Looking for an e-book on personal development?",
        "Find e-books on web development and coding...",
        "Explore e-books on science fiction and fantasy...",
    ];

    const ebooks = [
        {
            thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Deadpool & Wolverine",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            year: 1925,
            description: "A novel set in the Roaring Twenties, focusing on the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
            file: "https://example.com/the-great-gatsby.pdf",
            readers: 1200
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1431608660976-4fe5bcc2112c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "1984",
            author: "George Orwell",
            genre: "Dystopian",
            year: 1949,
            description: "A dystopian novel that explores the dangers of totalitarianism and the impacts of oppressive regimes.",
            file: "https://example.com/1984.pdf",
            readers: 1500
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Historical Fiction",
            year: 1960,
            description: "A novel that explores themes of racial injustice and moral growth through the eyes of young Scout Finch in the American South.",
            file: "https://example.com/to-kill-a-mockingbird.pdf",
            readers: 1800
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?q=80&w=2965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Moby-Dick",
            author: "Herman Melville",
            genre: "Adventure",
            year: 1851,
            description: "The story of Captain Ahab's obsessive quest to kill Moby Dick, the great white whale, exploring themes of revenge, fate, and humanity.",
            file: "https://example.com/moby-dick.pdf",
            readers: 1100
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Romance",
            year: 1813,
            description: "A classic novel that follows Elizabeth Bennet as she navigates issues of class, marriage, and morality in early 19th century England.",
            file: "https://example.com/pride-and-prejudice.pdf",
            readers: 2000
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            genre: "Literary Fiction",
            year: 1951,
            description: "The story of Holden Caulfield, a disenchanted teenager who has been expelled from prep school and experiences a series of existential crises.",
            file: "https://example.com/the-catcher-in-the-rye.pdf",
            readers: 1300
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1505489304219-85ce17010209?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Brave New World",
            author: "Aldous Huxley",
            genre: "Science Fiction",
            year: 1932,
            description: "A novel set in a dystopian future where technology and conditioning shape society, exploring themes of freedom, control, and individuality.",
            file: "https://example.com/brave-new-world.pdf",
            readers: 1400
        },
        {
            thumbnail: "https://images.unsplash.com/photo-1462903876006-77f6beb241b4?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Wuthering Heights",
            author: "Emily Brontë",
            genre: "Gothic Fiction",
            year: 1847,
            description: "The turbulent story of Heathcliff and Catherine Earnshaw, set on the Yorkshire moors, exploring themes of passion, revenge, and social class.",
            file: "https://example.com/wuthering-heights.pdf",
            readers: 1000
        }
    ];

    const features = [
        {
            title: "Decentralized Publishing",
            description:
                "Empower authors by allowing them to publish their e-books directly on a decentralized network, eliminating the need for intermediaries.",
            icon: <IconTerminal2 />,
        },
        {
            title: "Transparent Royalties",
            description:
                "Utilize smart contracts to ensure transparent and automated royalty payments to authors, creating trust and fairness.",
            icon: <IconCurrencyDollar />,
        },
        {
            title: "Direct Reader Engagement",
            description:
                "Connect authors and readers directly, allowing for personalized experiences and community-building around content.",
            icon: <IconHeart />,
        },
        {
            title: "Immutable Content Storage",
            description:
                "Store e-books in a tamper-proof and censorship-resistant manner, ensuring content authenticity and longevity.",
            icon: <IconCloud />,
        },
        {
            title: "Low Transaction Costs",
            description:
                "Benefit from low transaction fees when purchasing or transferring digital assets, thanks to the efficiency of the ICP blockchain.",
            icon: <IconEaseInOut />,
        },
        {
            title: "Community-Driven Ecosystem",
            description:
                "Encourage community governance and contributions, allowing users to vote on platform features and policies.",
            icon: <IconAdjustmentsBolt />,
        },
        {
            title: "Tokenized Access and Rewards",
            description:
                "Offer token-based access to premium content and reward loyal readers and contributors with native platform tokens.",
            icon: <IconRouteAltLeft />,
        },
        {
            title: "Scalable and Secure",
            description:
                "Built on ICP, ensuring that the platform scales effortlessly while maintaining top-notch security and data integrity.",
            icon: <IconHelp />,
        },
    ];

    const globeConfig = {
        pointSize: 4,
        globeColor: "#062056",
        showAtmosphere: true,
        atmosphereColor: "#FFFFFF",
        atmosphereAltitude: 0.1,
        emissive: "#062056",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };

    const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
    const sampleArcs = [
        {
            order: 1,
            startLat: -19.885592,
            startLng: -43.951191,
            endLat: -22.9068,
            endLng: -43.1729,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 1,
            startLat: 28.6139,
            startLng: 77.209,
            endLat: 3.139,
            endLng: 101.6869,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 1,
            startLat: -19.885592,
            startLng: -43.951191,
            endLat: -1.303396,
            endLng: 36.852443,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 2,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 2,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 3.139,
            endLng: 101.6869,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 2,
            startLat: -15.785493,
            startLng: -47.909029,
            endLat: 36.162809,
            endLng: -115.119411,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 3,
            startLat: -33.8688,
            startLng: 151.2093,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 3,
            startLat: 21.3099,
            startLng: -157.8581,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 3,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 4,
            startLat: 11.986597,
            startLng: 8.571831,
            endLat: -15.595412,
            endLng: -56.05918,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 4,
            startLat: -34.6037,
            startLng: -58.3816,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 4,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 48.8566,
            endLng: -2.3522,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 5,
            startLat: 14.5995,
            startLng: 120.9842,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 5,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: -33.8688,
            endLng: 151.2093,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 5,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 48.8566,
            endLng: -2.3522,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 6,
            startLat: -15.432563,
            startLng: 28.315853,
            endLat: 1.094136,
            endLng: -63.34546,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 6,
            startLat: 37.5665,
            startLng: 126.978,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 6,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 51.5072,
            endLng: -0.1276,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 7,
            startLat: -19.885592,
            startLng: -43.951191,
            endLat: -15.595412,
            endLng: -56.05918,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 7,
            startLat: 48.8566,
            startLng: -2.3522,
            endLat: 52.52,
            endLng: 13.405,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 7,
            startLat: 52.52,
            startLng: 13.405,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 8,
            startLat: -8.833221,
            startLng: 13.264837,
            endLat: -33.936138,
            endLng: 18.436529,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 8,
            startLat: 49.2827,
            startLng: -123.1207,
            endLat: 52.3676,
            endLng: 4.9041,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 8,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: 40.7128,
            endLng: -74.006,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 9,
            startLat: 51.5072,
            startLng: -0.1276,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 9,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: -22.9068,
            endLng: -43.1729,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 9,
            startLat: 1.3521,
            startLng: 103.8198,
            endLat: -34.6037,
            endLng: -58.3816,
            arcAlt: 0.5,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 10,
            startLat: -22.9068,
            startLng: -43.1729,
            endLat: 28.6139,
            endLng: 77.209,
            arcAlt: 0.7,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 10,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 31.2304,
            endLng: 121.4737,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 10,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 52.3676,
            endLng: 4.9041,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 11,
            startLat: 41.9028,
            startLng: 12.4964,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 11,
            startLat: -6.2088,
            startLng: 106.8456,
            endLat: 31.2304,
            endLng: 121.4737,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 11,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 1.3521,
            endLng: 103.8198,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 12,
            startLat: 34.0522,
            startLng: -118.2437,
            endLat: 37.7749,
            endLng: -122.4194,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 12,
            startLat: 35.6762,
            startLng: 139.6503,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.2,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 12,
            startLat: 22.3193,
            startLng: 114.1694,
            endLat: 34.0522,
            endLng: -118.2437,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 13,
            startLat: 52.52,
            startLng: 13.405,
            endLat: 22.3193,
            endLng: 114.1694,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 13,
            startLat: 11.986597,
            startLng: 8.571831,
            endLat: 35.6762,
            endLng: 139.6503,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 13,
            startLat: -22.9068,
            startLng: -43.1729,
            endLat: -34.6037,
            endLng: -58.3816,
            arcAlt: 0.1,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
        {
            order: 14,
            startLat: -33.936138,
            startLng: 18.436529,
            endLat: 21.395643,
            endLng: 39.883798,
            arcAlt: 0.3,
            color: colors[Math.floor(Math.random() * (colors.length - 1))],
        },
    ];

    const [active, setActive] = useState(null);
    const id = useId();
    const ref = useRef(null);
    const [filteredEBooks, setFilteredEBooks] = useState(ebooks);
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Filter ebooks based on the search term
        const filtered = ebooks.filter((ebook) =>
            [ebook.title, ebook.author, ebook.genre, ebook.year?.toString() || ''].some(
                (field) => (field || '').toLowerCase().includes(term.toLowerCase())
            )
        );

        if (filtered.length > 0) {
            setFilteredEBooks(filtered);
            setMessage("");
        } else {
            setFilteredEBooks([]);
            setMessage("Oops... We couldn't find the book you were looking for!");
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const filtered = ebooks.filter((ebook) =>
            [ebook.title, ebook.author, ebook.genre, ebook.year?.toString() || ''].some(
                (field) => (field || '').toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        if (filtered.length > 0) {
            setFilteredEBooks(filtered);
        } else {
            setFilteredEBooks(filtered);
            setMessage("Oops... We couldn't find the book you were looking for!");
        }
    };

    return (
        <div className="h-full w-full flex flex-col space-y-8 items-center justify-center">
            <HeroHighlight className="h-full w-full flex flex-col space-y-6 justify-center items-center">
                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [40, 0, 0],
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
                >
                    Discover, Read, and Engage with Your Digital Books on the <br />
                    {" "}
                    <Highlight className="text-gray-900">
                        ICP Ecosystem.
                    </Highlight>
                </motion.h1>
                <motion.button
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [40, 0, 0],
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="text-sm sm:text-base flex flex-row justify-center items-center px-4 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                    Continue Reading <FontAwesomeIcon className="ms-2" icon={faArrowRight} size="lg" style={{ color: "#ffffff", }} />
                </motion.button>
            </HeroHighlight>
            <div className="h-full w-full flex flex-col justify-center items-center px-8 sm:px-10">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [40, 0, 0],
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}>
                    <div className="mb-6 sm:mb-8 text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 font-semibold relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700">
                        <span className="">Discover Your Next E-Book Adventure</span>
                    </div>
                </motion.div>
                <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
            </div>
            <div className="w-full h-full px-8 sm:px-10 pt-2">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [40, 0, 0],
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                >
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="bg-gray-900 text-white flex items-center"
                    >
                        <h2

                            className="text-base lg:text-lg text-start text-white font-medium">
                            Recommended E-Books
                        </h2>
                    </HoverBorderGradient>
                </motion.div>
                <AnimatePresence className="h-full">
                    {active && typeof active === "object" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="m-0 p-0 fixed inset-0 bg-black/20 h-full w-full z-10"
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence className="h-full">
                    {active && typeof active === "object" ? (
                        <div className="h-full w-full fixed inset-0 grid place-items-center z-[100]">
                            <motion.button
                                key={`button-${active.title}-${id}`}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                                onClick={() => setActive(null)}
                            >
                                <CloseIcon />
                            </motion.button>
                            <motion.div
                                layoutId={`ebook-${active.title}-${id}`}
                                ref={ref}
                                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden"
                            >
                                <motion.div layoutId={`image-${active.title}-${id}`}>
                                    <img
                                        src={active.thumbnail}
                                        alt={active.title}
                                        className="w-full h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                    />
                                </motion.div>
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div className="flex justify-between items-start p-4">
                                        <div className="">
                                            <motion.h3
                                                layoutId={`title-${active.title}-${id}`}
                                                className="font-bold text-gray-900 text-lg flex flex-row items-center"
                                            >
                                                {active.title || <Skeleton />}
                                                <svg className="w-4 h-4 text-gray-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            </motion.h3>
                                            <motion.p
                                                layoutId={`author-${active.author}-${id}`}
                                                className="text-blue-500 text-base italic"
                                            >
                                                by {active.author || <Skeleton />}
                                            </motion.p>
                                            <motion.p
                                                layoutId={`genre-${active.genre}-${id}`}
                                                className="text-gray-600 text-base mt-4"
                                            >
                                                Genre: {active.genre || <Skeleton />}
                                            </motion.p>
                                            <motion.p
                                                layoutId={`year-${active.year}-${id}`}
                                                className="text-gray-600 text-base"
                                            >
                                                Year: {active.year || <Skeleton />}
                                            </motion.p>
                                            <motion.p
                                                layoutId={`description-${active.description}-${id}`}
                                                className="text-gray-600 text-base mt-4"
                                            >
                                                {active.description || <Skeleton count={5} />}
                                            </motion.p>
                                        </div>
                                        <motion.a
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            href={active.file}
                                            target="_blank"
                                            className="text-center w-1/2 px-2 py-3 text-sm rounded-full font-bold bg-blue-500 text-white"
                                        >
                                            Read Now
                                        </motion.a>
                                    </div>
                                    <div className="w-full flex justify-center items-center bg-blue-500 p-4 relative">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-white text-center text-xs md:text-sm lg:text-base md:h-fit flex flex-col items-center gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                        >
                                            read by {active.readers || <Skeleton />}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : null}
                </AnimatePresence>
                <motion.ul
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [40, 0, 0],
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="mt-2 mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-2">
                    {filteredEBooks.length > 0 ? filteredEBooks.map((ebook, index) => (
                        <motion.div
                            layoutId={`ebook-${ebook.title}-${id}`}
                            key={ebook.title}
                            onClick={() => setActive(ebook)}
                            className="p-4 flex flex-col hover:bg-blue-100 rounded-xl cursor-pointer"
                        >
                            <div className="flex gap-4 flex-col w-full">
                                <motion.div layoutId={`image-${ebook.title}-${id}`}>
                                    <ImageWithSkeleton src={ebook.thumbnail} alt={ebook.title} />
                                </motion.div>
                                <div className="flex justify-center items-center flex-col">
                                    <motion.h3
                                        layoutId={`title-${ebook.title}-${id}`}
                                        className="font-medium text-gray-900 text-center md:text-left text-base"
                                    >
                                        {ebook.title || <Skeleton />}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`author-${ebook.author}-${id}`}
                                        className="text-gray-600 text-center md:text-left text-base"
                                    >
                                        {ebook.author || <Skeleton />}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    )) :
                        <motion.h2
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: [40, 0, 0],
                            }}
                            transition={{
                                duration: 1,
                                ease: [0.4, 0.0, 0.2, 1],
                            }} className="col-span-1 md:col-span-4 text-base md:text-lg lg:text-xl text-center text-gray-400 font-semibold">
                            {message}
                        </motion.h2>
                    }
                </motion.ul>
            </div>
            <div className="w-full h-full bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 mx-auto p-8 sm:p-10">
                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [40, 0, 0],
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="mb-6 sm:mb-8 col-span-1 lg:col-span-4 text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 font-semibold relative p-1 bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700">
                    Empowering Digital Publishing with Innovative Solutions
                </motion.h2>
                {features.map((feature, index) => (
                    <Section key={feature.title} {...feature} index={index} />
                ))}
            </div>
            <div className="flex flex-col items-center mx-auto w-full relative overflow-hidden h-[20rem] lg:h-[40rem] px-8 sm:px-10">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [40, 0, 0],
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                    className="div"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 font-semibold relative p-1 bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700">
                        Revolutionizing Literature
                    </h2>
                    <p className="text-center text-base md:text-lg font-normal text-gray-700 max-w-md mt-2 mx-auto">
                        A Web3 ICP App Bringing Authors and Readers Together Like Never Before.
                    </p>
                </motion.div>
                <div className="absolute w-full bottom-0 inset-x-0 h-20 lg:h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-blue-200 z-40" />
                <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
                    <Suspense fallback={<div>Loading Globe...</div>}>
                        <World data={sampleArcs} globeConfig={globeConfig} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default Home;