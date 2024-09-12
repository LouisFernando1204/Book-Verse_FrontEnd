/* eslint-disable no-unused-vars */
import DropDown from "../components/ui/dropdown"
import { AnimatePresence, motion } from "framer-motion"
import { HoverBorderGradient } from "../components/ui/hover-border-gradient"
import { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { CloseIcon } from "../components/ui/close-icon";
import ImageWithSkeleton from "../components/ui/image-with-skeleton";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

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

    const [filteredEBooks, setFilteredEBooks] = useState(ebooks);
    const [searchTerm, setSearchTerm] = useState("");
    const [message, setMessage] = useState("");

    const [active, setActive] = useState(null);
    const id = useId();
    const ref = useRef(null);

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
            setMessage("");
        } else {
            setFilteredEBooks([]);
            setMessage("Oops... We couldn't find the book you were looking for!");
        }
    };

    const [favoriteEBooks, setFavoriteEBooks] = useState([]);

    const handleAddToFavorites = (book) => {
        setFavoriteEBooks((prevFavorites) => {
            // Cek apakah buku sudah ada dalam daftar favorit
            if (prevFavorites.some(favorite => favorite.title === book.title)) {
                return prevFavorites; // Jika sudah ada, tidak perlu menambahkan
            }
            return [...prevFavorites, book];
        });
    };

    return (
        <div className="h-full w-full flex flex-col space-y-8 items-center justify-center">
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
                    <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
                    <DropDown setFilteredEBooks={setFilteredEBooks} filteredEBooks={filteredEBooks} favoriteEBooks={favoriteEBooks} ebooks={ebooks} />
                </div>
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
                                                <svg
                                                    onClick={() => handleAddToFavorites(active)}
                                                    className={favoriteEBooks.includes(active) ? "w-4 h-4 text-yellow-300 ms-1 cursor-pointer" : "w-4 h-4 text-gray-300 ms-1 cursor-pointer"}
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
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
        </div>
    )
}

export default BookList