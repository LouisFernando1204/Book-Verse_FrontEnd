/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import ErrorMessage from "../components/ui/error-message";
import Card from "../components/ui/card-booklist";
import DropDown from "../components/ui/dropdown"

const BookList = () => {

    const placeholders = [
        "Search for a classic literature e-book...",
        "Find the latest best-sellers in digital format...",
        "Looking for an e-book on personal development?",
        "Find e-books on web development and coding...",
        "Explore e-books on science fiction and fantasy...",
    ];

    const ebooks = [
        {
            thumbnail: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Iron Man: Legacy of Doom",
            author: "Stan Lee",
            genre: "Fiction",
            year: 1925,
            description: "Marvel Comics is a leading American comic book publisher known for its expansive universe of superhero stories. Founded in 1939, Marvel has introduced iconic characters like Spider-Man, Iron Man, the Avengers, and the X-Men.",
            file: "https://www.kranzcom.com/ebookebook.pdf",
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

    const [filteredEBooks, setFilteredEBooks] = useState(ebooks);
    const [favoriteEBooks, setFavoriteEBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAllEBook, setIsAllEBook] = useState(true);
    const [isBookmark, setIsBookmark] = useState(false);

    useEffect(() => {
        const term = searchTerm.toLowerCase();

        let filtered = [];

        if (isAllEBook) {
            filtered = ebooks.filter((ebook) =>
                [ebook.title, ebook.author, ebook.genre, ebook.year?.toString() || ''].some(
                    (field) => (field || '').toLowerCase().includes(term)
                )
            );
        } else if (isBookmark) {
            filtered = favoriteEBooks.filter((ebook) =>
                [ebook.title, ebook.author, ebook.genre, ebook.year?.toString() || ''].some(
                    (field) => (field || '').toLowerCase().includes(term)
                )
            );
        }

        setFilteredEBooks(filtered);

        if (filtered.length > 0) {
            setMessage("");
        } else {
            setMessage(isBookmark ? "Oops... You haven't bookmarked any books yet!" : "Oops... We couldn't find the book you were looking for!");
        }
    }, [searchTerm, isAllEBook, isBookmark, favoriteEBooks]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleAddToFavorites = (ebook) => {
        const isFavorite = favoriteEBooks.some((fav) => fav.title === ebook.title);

        if (isFavorite) {
            setFavoriteEBooks(favoriteEBooks.filter((fav) => fav.title !== ebook.title));
        } else {
            setFavoriteEBooks([...favoriteEBooks, ebook]);
        }
    };

    return (
        <div className="h-full w-full flex flex-col space-y-8 items-center justify-center">
            {
                errorMessage ? (
                    <ErrorMessage errorCode={400} errorName={"Bad Request"} errorMessage={errorMessage} />
                )
                    : (
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
                                className="mb-6 text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 font-semibold relative p-1 bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700">
                                Discover Your Next Great Read
                            </motion.h2>
                            <div
                                className="mb-12 flex flex-col md:flex-row space-y-2 md:space-y-0 sm:space-x-2 justify-center items-center w-full">
                                <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={handleSubmit} />
                                <DropDown setIsAllEBook={setIsAllEBook} setIsBookmark={setIsBookmark} favoriteEBooks={favoriteEBooks} filteredEBooks={filteredEBooks} setMessage={setMessage} />
                            </div>
                            <Card handleAddToFavorites={handleAddToFavorites} filteredEBooks={filteredEBooks} favoriteEBooks={favoriteEBooks} message={message} isAllEBook={isAllEBook} isBookmark={isBookmark} searchTerm={searchTerm} />
                        </div>
                    )
            }
        </div>
    )
}

export default BookList