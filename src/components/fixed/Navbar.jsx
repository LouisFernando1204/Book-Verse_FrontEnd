/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import bookverseLogo from "../../assets/bookverse-logo.png";
import icpLogo from "../../assets/internet-computer-icp-logo.png";
import { Link, useLocation } from "react-router-dom";
import { truncate } from "../../utils/helper";

const initialNavigation = [
  { name: "Home", href: "/", current: false },
  { name: "Library", href: "/library", current: false },
  { name: "Profile", href: "/profile", current: false },
  { name: "Publish", href: "/publish", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ onLogin, identity }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigation, setNavigation] = useState(initialNavigation);
  const location = useLocation();

  const handleCurrentPage = (currentItem) => {
    setNavigation(
      navigation.map((item) => ({
        ...item,
        current: item.name === currentItem,
      }))
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    setNavigation(
      navigation.map((item) => ({
        ...item,
        current: item.href === currentPath,
      }))
    );
  }, [location.pathname]);

  return (
    <Disclosure
      as="nav"
      className={classNames(
        "bg-blue-300 w-full transition-shadow",
        isScrolled ? "shadow-lg" : ""
      )}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-full p-2 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
            <Link to="/">
              <div className="flex flex-row space-x-2 flex-shrink-0 items-center">
                <img alt="Book-Verse" src={bookverseLogo} className="w-12" />
                <span className="hidden md:flex italic font-bold text-lg font-mono">
                  Book-Verse
                </span>
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleCurrentPage(item.name)}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gradient-to-b from-gray-900 to-gray-700 text-white hover:shadow-xl transition duration-200"
                        : "text-gray-900 hover:bg-gradient-to-b hover:from-gray-900 hover:to-gray-700 hover:text-white hover:shadow-xl hover:transition hover:duration-200",
                      "rounded-full px-4 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {identity ? (
              <Link
                className="text-base flex flex-row space-x-2 justify-center items-center px-4 py-1 rounded-full bg-gradient-to-b from-gray-900 to-gray-700 text-white hover:shadow-xl transition duration-200"
              >
                {truncate(identity, 4, 4, 11)}
                <img alt="ICP" src={icpLogo} className="h-8 w-auto ms-2" />
              </Link>
            ) : (
              <Link
                onClick={onLogin}
                className="text-base flex flex-row space-x-2 justify-center items-center px-4 py-1 rounded-full bg-gradient-to-b from-gray-900 to-gray-700 text-white hover:shadow-xl transition duration-200"
              >
                Login
                <img alt="ICP" src={icpLogo} className="h-8 w-auto ms-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => handleCurrentPage(item.name)}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "text-center bg-gradient-to-b from-gray-900 to-gray-700 text-white hover:shadow-xl transition duration-200"
                  : "text-center text-gray-900 hover:bg-gradient-to-b hover:from-gray-900 hover:to-gray-700 hover:text-white hover:shadow-xl hover:transition hover:duration-200",
                "block rounded-full px-4 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
