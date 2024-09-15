import { getWebAppWithLogin, getWebAppWithoutLogin } from "./connector";

export async function createBook(title, synopsis, year, genre, cover, file) {
  try {
    const webApp = await getWebAppWithLogin();
    await webApp.addBook(title, synopsis, year, genre, cover, file);
  } catch (error) {
    console.log(error);
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

function structuredBooks(data) {
  const bookList = data.map((book) => ({
    id: parseInt(book.id),
    title: book.title.toString(),
    synopsis: book.synopsis.toString(),
    file: book.file.toString(),
    cover: book.cover.toString(),
    author: book.author.toString(),
    year: parseInt(book.year),
    genre: book.genre.toString()
  }));
  return bookList;
}
