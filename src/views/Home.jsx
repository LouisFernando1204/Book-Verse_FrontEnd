/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { globeConfig, sampleArcs } from "../components/ui/globe";
import Section from "../components/ui/section";
import ErrorMessage from "../components/ui/error-message";
import Card from "../components/ui/card-home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
import { getBooks } from "../services/book";
import { getCurrentBook } from "../services/reader";
import { getCurrentIdentity } from "../services/connector";
import { useNavigate } from "react-router-dom";
import { addToBookmark, getBookmarks, removeFromBookmark, donateToAuthor } from "../services/book";

const World = React.lazy(() =>
  import("../components/ui/globe").then((m) => ({ default: m.World }))
);

const Home = ({ identity }) => {
  const searchPlaceholders = [
    "Search for a classic literature e-book...",
    "Find the latest best-sellers in digital format...",
    "Looking for an e-book on personal development?",
    "Find e-books on web development and coding...",
    "Explore e-books on science fiction and fantasy...",
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

  const [ebooksData, setEbooksData] = useState(null);
  const [filteredEBooks, setFilteredEBooks] = useState([]);
  const [favoriteEBooks, setFavoriteEBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [currentRead, setCurrentRead] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentRead = async () => {
      const [availability, title] = await getCurrentBook(identity);
      setAvailable(availability);
      if (availability) {
        const ebooks = await getBooks();
        console.log(ebooks);
        const currentBook = ebooks.find((book) => book.title === title.toString());
        console.log(currentBook);
        setCurrentRead(currentBook);
      }
    };
    if (identity != "" && identity != null) {
      fetchCurrentRead();
    }
  }, [identity]);

  useEffect(() => {
    const fetchEbooks = async () => {
      const data = await getBooks();
      const filteredYear = data.filter(
        (book) => book.year === new Date().getFullYear()
      );
      setEbooksData(filteredYear);
    };

    fetchEbooks();

    const fetchBookmark = async () => {
      try {
        setLoading(true);
        const data = await getBookmarks(identity);
        setFavoriteEBooks(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookmark();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    let filtered = [];

    if (ebooksData != null) {
      filtered = ebooksData.filter((ebook) =>
        [
          ebook.title,
          ebook.author,
          ebook.genre,
          ebook.year?.toString() || "",
        ].some((field) => (field || "").toLowerCase().includes(term))
      );

      setFilteredEBooks(filtered);

      if (filtered.length > 0) {
        setMessage("");
      } else {
        setMessage("Oops... We couldn't find the book you were looking for!");
      }
    }
  }, [searchTerm, favoriteEBooks, ebooksData]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAddToFavorites = async (ebook) => {
    const isFavorite = favoriteEBooks.some((fav) => fav.title === ebook.title);

    if (isFavorite) {
      await removeFromBookmark(ebook.id);
      setFavoriteEBooks(
        favoriteEBooks.filter((fav) => fav.title !== ebook.title)
      );
      console.log(favoriteEBooks);

    } else {
      await addToBookmark(ebook.id);
      const updatedFavorites = await getBookmarks(identity);
      setFavoriteEBooks([...updatedFavorites]);
      console.log(favoriteEBooks);

    }
  };

  const handleRead = async () => {
    navigate(
      `/ebook?file=https://gateway.pinata.cloud/ipfs/${encodeURIComponent(
        currentRead.file
      )}`
    );
  };

  const handleDonateToAuthor = async (identity, amount) => {
    await donateToAuthor(identity, amount);
  };

  return (
    <div className="h-full w-full flex flex-col space-y-8 items-center justify-center">
      {errorMessage ? (
        <ErrorMessage
          errorCode={400}
          errorName={"Bad Request"}
          errorMessage={errorMessage}
        />
      ) : (
        <>
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
              Discover, Read, and Engage with Your Digital Books on the <br />{" "}
              <Highlight className="text-gray-900">ICP Ecosystem.</Highlight>
            </motion.h1>
            {available && identity != "" && (
              <motion.button
                onClick={() => handleRead()}
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
                className="text-sm sm:text-base flex flex-row justify-center items-center px-4 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
              >
                Continue Reading{" "}
                <FontAwesomeIcon
                  className="ms-2"
                  icon={faArrowRight}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
              </motion.button>
            )}
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
              }}
            >
              <div className="mb-6 sm:mb-8 text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 font-semibold relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700">
                <span className="">Discover Your Next E-Book Adventure</span>
              </div>
            </motion.div>
            <PlaceholdersAndVanishInput
              placeholders={searchPlaceholders}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
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
                <h2 className="text-base lg:text-lg text-start text-white font-medium">
                  Recommended E-Books
                </h2>
              </HoverBorderGradient>
            </motion.div>
            <Card
              handleAddToFavorites={handleAddToFavorites}
              filteredEBooks={filteredEBooks}
              favoriteEBooks={favoriteEBooks}
              message={message}
              donateToAuthor={handleDonateToAuthor}
              identity={identity}
            />
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
              className="mb-6 sm:mb-8 col-span-1 md:col-span-2 lg:col-span-4 text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 font-semibold relative p-1 bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700"
            >
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
                A Web3 ICP App Bringing Authors and Readers Together Like Never
                Before.
              </p>
            </motion.div>
            <div className="absolute w-full bottom-0 inset-x-0 h-20 lg:h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-blue-200 z-40" />
            <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
              <Suspense fallback={<div>Loading Globe...</div>}>
                <World data={sampleArcs} globeConfig={globeConfig} />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
