import { getWebAppWithLogin, getWebAppWithoutLogin } from "./connector";

export async function readBook(title) {
  try {
    const webApp = await getWebAppWithLogin();
    await webApp.readBook(title);
  } 
  catch (error) {
    console.log(error);
  }
}

export async function getReaders(title) {
  return await loadReaders(title);
}

async function loadReaders(title) {
  try {
    const webApp = await getWebAppWithoutLogin();
    const data = await webApp.getBookReaders(title);
    return parseInt(data);
  } catch (error) {
    console.log(error);
    return "";
  }
}
