/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import ErrorMessage from "../components/ui/error-message";
import Card from "../components/ui/card-booklist";
import DropDown from "../components/ui/dropdown";
import { getBooks, addToBookmark, getBookmarks, removeFromBookmark, donateToAuthor } from "../services/book";
import LoadingScreen from "../components/ui/loading-screen";

const BookList = ({ identity }) => {
  const placeholders = [
    "Search for a classic literature e-book...",
    "Find the latest best-sellers in digital format...",
    "Looking for an e-book on personal development?",
    "Find e-books on web development and coding...",
    "Explore e-books on science fiction and fantasy...",
  ];

  const [ebooksData, setEbooksData] = useState(null);
  const [filteredEBooks, setFilteredEBooks] = useState([]);
  const [favoriteEBooks, setFavoriteEBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAllEBook, setIsAllEBook] = useState(true);
  const [isBookmark, setIsBookmark] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const allBooks = await getBooks();
        setEbooksData(allBooks);
        const bookmarks = await getBookmarks(identity);
        setFavoriteEBooks(bookmarks);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchBook();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    let filtered = [];

    if (isAllEBook && ebooksData != null) {
      filtered = ebooksData.filter((ebook) =>
        [
          ebook.title,
          ebook.author,
          ebook.genre,
          ebook.year?.toString() || "",
        ].some((field) => (field || "").toLowerCase().includes(term))
      );
    } else if (isBookmark) {
      filtered = favoriteEBooks.filter((ebook) =>
        [
          ebook.title,
          ebook.author,
          ebook.genre,
          ebook.year?.toString() || "",
        ].some((field) => (field || "").toLowerCase().includes(term))
      );
    }

    setFilteredEBooks(filtered);

    if (filtered.length > 0) {
      setMessage("");
    } else {
      setMessage(
        isBookmark
          ? "Oops... You haven't bookmarked any books yet!"
          : "Oops... We couldn't find the book you were looking for!"
      );
    };

    console.log(loading);

  }, [searchTerm, isAllEBook, isBookmark, favoriteEBooks, ebooksData]);

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

  const handleDonateToAuthor = async (identity, amount) => {
    await donateToAuthor(identity, amount);
  };

  return (
    loading ? (
      <LoadingScreen />
    ) : (
      <div className="h-full w-full flex flex-col space-y-8 items-center justify-center">
        {errorMessage ? (
          <ErrorMessage
            errorCode={400}
            errorName={"Bad Request"}
            errorMessage={errorMessage}
          />
        ) : (
          <div className="w-full h-full p-10">
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
              className="mb-6 text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 font-semibold relative p-1 bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700"
            >
              Discover Your Next Great Read
            </motion.h2>
            <div className="mb-12 flex flex-col md:flex-row space-y-2 md:space-y-0 sm:space-x-2 justify-center items-center w-full">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
              <DropDown
                setIsAllEBook={setIsAllEBook}
                setIsBookmark={setIsBookmark}
                favoriteEBooks={favoriteEBooks}
                filteredEBooks={filteredEBooks}
                setMessage={setMessage}
              />
            </div>
            <Card
              handleAddToFavorites={handleAddToFavorites}
              filteredEBooks={filteredEBooks}
              favoriteEBooks={favoriteEBooks}
              message={message}
              isAllEBook={isAllEBook}
              isBookmark={isBookmark}
              searchTerm={searchTerm}
              donateToAuthor={handleDonateToAuthor}
            />
          </div>
        )}
      </div>
    )
  )
};

export default BookList;
