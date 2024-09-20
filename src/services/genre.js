import { getWebAppWithoutLogin } from "./connector";

export async function getGenres() {
  return await loadGenres();
}

async function loadGenres() {
  try {
    const webApp = await getWebAppWithoutLogin();
    const data = await webApp.getGenres();
    return structuredGenres(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

function structuredGenres(data) {
  const genreList = data.map((genre) => genre.toString());
  return genreList;
}
