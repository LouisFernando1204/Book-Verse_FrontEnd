/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'

export default function DropDown({ setIsAllEBook, setIsBookmark, favoriteEBooks, filteredEBooks, setMessage }) {
    const handleAllEBookClick = () => {
        setIsAllEBook(true);
        setIsBookmark(false);
        if (filteredEBooks.length > 0) {
            setMessage("");
        } else {
            setMessage("Oops... We couldn't find the book you were looking for!");
        }

        console.log(favoriteEBooks);
        console.log(filteredEBooks);

    };

    const handleBookmarkClick = () => {
        setIsBookmark(true);
        setIsAllEBook(false);
        if (favoriteEBooks.length > 0) {
            setMessage("");
        } else {
            setMessage("Oops... You haven't bookmarked any books yet!");
        }

        console.log(favoriteEBooks);
        console.log(filteredEBooks);
    };

    return (
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
            className='w-full lg:w-fit'
        >
            <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Filter
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                    </MenuButton>
                </div>
                <MenuItems
                    transition
                    className="w-full lg:w-56 absolute left-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-gray-900 ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        <MenuItem>
                            <span onClick={() => handleAllEBookClick()} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                All E-Books
                            </span>
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            <span onClick={() => handleBookmarkClick()} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                Bookmark
                            </span>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </motion.div>
    )
}