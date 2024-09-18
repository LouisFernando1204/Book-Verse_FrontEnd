import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faGithub, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';
import bookverseLogo from '../../assets/bookverse-logo.png';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-300 shadow dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={bookverseLogo} className="h-8" alt="Book-Verse" />
                        <span className="italic font-mono self-center text-2xl font-semibold whitespace-nowrap text-gray-900">Book-Verse</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6"><FontAwesomeIcon icon={faDiscord} style={{ color: "#111827", }} size="lg" /></a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6"><FontAwesomeIcon icon={faGithub} style={{ color: "#111827", }} size="lg" /></a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6"><FontAwesomeIcon icon={faTwitter} style={{ color: "#111827", }} size="lg" /></a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline"><FontAwesomeIcon icon={faMedium} style={{ color: "#111827", }} size="lg" /></a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-900 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-900 sm:text-center">© {currentYear} <a href="#" className="hover:underline">Book-Verse™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer