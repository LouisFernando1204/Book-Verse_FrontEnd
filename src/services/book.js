import { getWebAppWithLogin, getWebAppWithoutLogin } from "./connector";
import { Principal } from "@dfinity/principal";

export async function createBook(title, synopsis, year, genre, cover, file) {
  try {
    const webApp = await getWebAppWithLogin();
    await webApp.addBook(title, synopsis, year, genre, cover, file);
  } catch (error) {
    console.log(error);
  }
}

export async function getUploadedBooks(user){
  return await loadUploadedBooks(user);
}

async function loadUploadedBooks(user) {
  try {
    const webApp = await getWebAppWithLogin();
    const data = await webApp.getUploadedBooks(Principal.fromText(user));
    return structuredBooks(data);
  } catch (error) {
    console.log(error); 
    return [];
  }
}

export async function getBooks() {
  return await loadBooks();
}

async function loadBooks() {
  try {
    const webApp = await getWebAppWithoutLogin();
    const data = await webApp.getBooks();
    return structuredBooks(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getBookmarks = async (currentIdentity) => {
  try {
    const webApp = await getWebAppWithLogin();
    const data = await webApp.getBookmarks(Principal.fromText(currentIdentity));
    return await structuredBookmarks(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addToBookmark = async (id) => {
  try {
    const webApp = await getWebAppWithLogin();
    await webApp.addToBookmark(id);
  } catch (error) {
    console.log(error);
  }
}

export const removeFromBookmark = async (id) => {
  try {
    const webApp = await getWebAppWithLogin();
    await webApp.removeFromBookmark(id);
  } catch (error) {
    console.log(error);
  }
};

export const donateToAuthor = async (currentIdentity, amount) => {
  try {
    const webApp = await getWebAppWithLogin();
    await webApp.donateToAuthor(Principal.fromText(currentIdentity), parseInt(amount));
  } catch (error) {
    console.log(error);
  }
};

async function structuredBookmarks(data) {
  try {
    const webApp = await getWebAppWithLogin();
    const allBooks = await webApp.getBooks();
    const bookList = data.map((id) => {
      const book = allBooks.find((b) => b.id === id);
      if (book) {
        return {
          id: parseInt(book.id),
          title: book.title.toString(),
          synopsis: book.synopsis.toString(),
          file: book.file.toString(),
          cover: book.cover.toString(),
          author: book.author.toString(),
          year: parseInt(book.year),
          genre: book.genre.toString(),
        };
      }
      return null;
    }).filter(Boolean);
    console.log(bookList);

    return bookList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function structuredBooks(data) {
  const bookList = data.map((book) => ({
    id: parseInt(book.id),
    title: book.title.toString(),
    synopsis: book.synopsis.toString(),
    file: book.file.toString(),
    cover: book.cover.toString(),
    author: book.author.toString(),
    year: parseInt(book.year),
    genre: book.genre.toString(),
  }));
  return bookList;
}