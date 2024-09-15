/* eslint-disable react/prop-types */
import { CloseIcon } from "./close-icon";
import Skeleton from 'react-loading-skeleton';
import { Link } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
import ImageWithSkeleton from "./image-with-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../ui/animated-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

const Card = ({ handleAddToFavorites, filteredEBooks, favoriteEBooks, message, isAllEBook, isBookmark, searchTerm }) => {

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

    return (
        <>
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
                            <div className="flex flex-col h-full w-full">
                                <div className="flex justify-between items-start px-4 pt-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-gray-900 text-lg flex flex-row items-center"
                                        >
                                            {active.title || <Skeleton />}
                                            <svg
                                                onClick={() => handleAddToFavorites(active)}
                                                className={favoriteEBooks.some((fav) => fav.title === active.title) ? "w-4 h-4 text-yellow-300 ms-1 cursor-pointer" : "w-4 h-4 text-gray-300 ms-1 cursor-pointer"}
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
                                    </div>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center w-1/4 px-2 py-3 text-sm rounded-full font-bold bg-blue-500 text-white"
                                    >
                                        <Link to={`/ebook?file=${encodeURIComponent(active.file)}`}>Read Now</Link>
                                    </motion.div>
                                </div>
                                <div className="flex flex-col w-full h-full justify-between">
                                    <div className="w-full flex flex-col items-start px-4 pb-4">
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
                                    <div className="w-full flex justify-center items-center bg-blue-500 p-4 relative">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-white text-center text-sm lg:text-base md:h-fit flex flex-col items-center gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                        >
                                            read by {active.readers || <Skeleton />} peeps
                                        </motion.div>
                                    </div>
                                </div>
                                <Modal>
                                    <ModalTrigger className="w-full bg-gray-900 text-blue-500 flex justify-center group/modal-btn">
                                        <span className="group-hover/modal-btn:translate-x-80 text-center transition duration-500">
                                            Donate
                                        </span>
                                        <div className="-translate-x-80 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-blue-500 z-20">
                                            <FontAwesomeIcon icon={faBitcoin} size="lg" style={{ color: "#3b82f6", }} />
                                        </div>
                                    </ModalTrigger>
                                    <ModalBody className="flex flex-col w-full">
                                        <ModalContent className="flex flex-col w-full justify-center items-center">
                                            <h4 className="text-lg md:text-2xl text-gray-900 font-bold text-center mb-8">
                                                Donate to {" "}
                                                <span className="px-1 py-0.5 rounded-md bg-gray-100 text-blue-500 border border-gray-200">
                                                    {active.author}
                                                </span>{" "}
                                                !
                                            </h4>
                                            <div className="flex flex-col justify-center items-center h-full w-full">
                                                <form className="max-w-sm mx-auto flex flex-col justify-center items-center">
                                                    <label htmlFor="number-input" className="block mb-2 text-base font-medium text-gray-900">How much you want to donate:</label>
                                                    <input type="number" min="1" step="1" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Minimum: 1" required />
                                                </form>
                                            </div>
                                        </ModalContent>
                                        <ModalFooter className="">
                                            <button className="bg-blue-500 text-white text-sm lg:text-base px-4 py-2 rounded-md border border-blue-500 w-28">
                                                Donate
                                            </button>
                                        </ModalFooter>
                                    </ModalBody>
                                </Modal>
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
                className="mt-2 mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-2"
            >
                {(isAllEBook || isBookmark) ? (
                    (isAllEBook ? filteredEBooks : favoriteEBooks)
                        .filter((ebook) =>
                            [ebook.title, ebook.author, ebook.genre, ebook.year?.toString() || ''].some(
                                (field) => (field || '').toLowerCase().includes(searchTerm.toLowerCase())
                            )
                        )
                        .length > 0 ? (
                        (isAllEBook ? filteredEBooks : favoriteEBooks)
                            .filter((ebook) =>
                                [ebook.title, ebook.author, ebook.genre, ebook.year?.toString() || ''].some(
                                    (field) => (field || '').toLowerCase().includes(searchTerm.toLowerCase())
                                )
                            )
                            .map((ebook) => (
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
                            ))
                    ) : (
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
                            className="col-span-1 md:col-span-4 text-base md:text-lg lg:text-xl text-center text-gray-400 font-semibold"
                        >
                            {message}
                        </motion.h2>
                    )
                ) : (
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
                        className="col-span-1 md:col-span-4 text-base md:text-lg lg:text-xl text-center text-gray-400 font-semibold"
                    >
                        {message}
                    </motion.h2>
                )}
            </motion.ul>
        </>
    )
}

export default Card;