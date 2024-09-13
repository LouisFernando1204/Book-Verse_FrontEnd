import { useState } from 'react';
import './App.css';

function BookForm () {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6">Book CRUD Form</h1>
          <form action="#" method="POST" encType="multipart/form-data" className="space-y-6">
            {/* Penulis (Author) */}
            <div className="flex items-center space-x-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 w-1/3 text-left">Penulis</label>
              <input type="text" id="author" name="author" required
                     className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Tahun terbit (Publication Year) */}
            <div className="flex items-center space-x-4">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 w-1/3 text-left">Tahun terbit</label>
              <input type="date" id="year" name="year" required
                     className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Thumbnail */}
            <div className="flex items-center space-x-4">
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 w-1/3 text-left">Thumbnail</label>
              <input type="file" id="thumbnail" name="thumbnail" accept="image/*"
                     className="mt-1 block w-2/3 text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100" />
            </div>

            {/* Deskripsi (Description) */}
            <div className="flex items-start space-x-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 w-1/3 text-left">Deskripsi</label>
              <textarea id="description" name="description" rows="4" required
                        className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            {/* Filenya (File) */}
            <div className="flex items-center space-x-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 w-1/3 text-left">Filenya</label>
              <input type="file" id="file" name="file"
                     className="mt-1 block w-2/3 text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100" />
            </div>

            {/* Genre */}
            <div className="flex items-center space-x-4">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 w-1/3 text-left">Genre</label>
              <input type="text" id="genre" name="genre" required
                     className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 rounded-lg w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <img src="blue-dot-wave-pattern-digital-vector-50803791.jpg" alt="Book Cover" className="h-full object-cover w-full" />
        </div>
      </div>
    </div>
  );
}

export default BookForm;
