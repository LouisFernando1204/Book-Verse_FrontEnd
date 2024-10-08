import { useState, useRef, useEffect } from "react";
import publishBackground from "../assets/blue-dot-wave-pattern-digital-vector-50803791.jpg";
import ErrorMessage from "../components/ui/error-message";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../services/genre";
import { PinataSDK } from "pinata-web3";
import { createBook } from "../services/book";
import LoadingScreen from "../components/ui/loading-screen";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [genreData, setGenreData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const titleRef = useRef(null);

  const pinata = new PinataSDK({
    pinataJwt: `${import.meta.env.VITE_JWT}`,
    pinataGateway: `${import.meta.env.VITE_GATEWAY}`,
  });

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = await getGenres();
        setGenreData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInput();
    await processData();
  };

  const validateInput = () => {
    if (
      title == "" ||
      parseInt(year) <= 0 ||
      parseInt(year) > new Date().getFullYear() ||
      synopsis == "" ||
      genre == "" ||
      thumbnail == null ||
      file == null
    ) {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  const processData = async () => {
    setLoading(true);
    const thumbnailCID = await uploadThumbnail();
    const fileCID = await uploadFile();
    await submitBookData(thumbnailCID, fileCID);
    reset();
  };

  const uploadThumbnail = async () => {
    try {
      const upload = await pinata.upload.file(thumbnail);
      return upload.IpfsHash;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const uploadFile = async () => {
    try {
      const upload = await pinata.upload.file(file);
      return upload.IpfsHash;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const submitBookData = async (thumbnailCID, fileCID) => {
    await createBook(
      title,
      synopsis,
      parseInt(year),
      genre,
      thumbnailCID,
      fileCID
    );
  };

  const reset = () => {
    setTitle("");
    setYear("");
    setGenre("");
    setSynopsis("");
    setThumbnail(null);
    setFile(null);
    setLoading(false);
    navigate("/library");
  };

  return (
    loading ? (
      <LoadingScreen />
    ) : (
      <div className="h-screen w-full flex flex-col items-center justify-center">
      {errorMessage ? (
        <ErrorMessage
          errorCode={400}
          errorName={"Bad Request"}
          errorMessage={errorMessage}
        />
      ) : (
        <div className="flex flex-col lg:flex-row w-full h-full bg-white shadow-lg overflow-hidden">
          {/* Form Section */}
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
            className="w-full h-full lg:w-1/2 p-8"
          >
            <h1 className="text-2xl font-bold mb-6">Publish Your E-Book</h1>
            <form onSubmit={handleSubmit} className="space-y-6 w-full h-full">
              {/* Title */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 w-1/3 text-left"
                >
                  Title
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Publication Year */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 w-1/3 text-left"
                >
                  Publication Year
                </label>
                <input
                  type="number"
                  id="year"
                  min={1}
                  step={1}
                  max={new Date().getFullYear()}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Genre */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700 w-1/3 text-left"
                >
                  Genre
                </label>
                {genreData && (
                  <select
                    id=""
                    className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    {genreData.map((data, index) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Synopsis */}
              <div className="flex items-start space-x-4">
                <label
                  htmlFor="synopsis"
                  className="block text-sm font-medium text-gray-700 w-1/3 text-left"
                >
                  Synopsis
                </label>
                <textarea
                  id="synopsis"
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  rows="4"
                  required
                  className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>

              {/* Thumbnail */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700 w-1/3 text-left"
                >
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="mt-1 block w-2/3 text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
                />
              </div>

              {/* File */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 w-1/3 text-left"
                >
                  Ebook File
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="mt-1 block w-2/3 text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>

          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2">
            <img
              src={publishBackground}
              alt="Book Cover"
              className="h-full object-cover w-full"
            />
          </div>
        </div>
      )}
    </div>
    )
  );
};

export default BookForm;
