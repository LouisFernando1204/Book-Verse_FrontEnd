import { Principal } from "@dfinity/principal";
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

export async function getPoints(user) {
  return await loadPoints(user);
}

export async function loadPoints(user) {
  try {
    const webApp = await getWebAppWithLogin();
    const data = await webApp.getPoints(Principal.fromText(user));
    return parseInt(data);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function getCurrentBook(user) {
  return await loadCurrentBook(user);
}

async function loadCurrentBook(user) {
  try {
    const webApp = await getWebAppWithLogin();
    const [availability, currentBook] = await webApp.getCurrentBook(Principal.fromText(user));
    console.log(availability);
    console.log(currentBook);
    return [availability, currentBook];
  }
  catch (error) {
    console.log(error);
    return;
  }
}

export async function getpointdonated(user){
  return await loadPointsdonated(user);
}

export async function loadPointsdonated(user) {
  try {
    const webApp = await getWebAppWithLogin();
    const data = await webApp.getDonationTotal(Principal.fromText(user));
    return parseInt(data);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function getpointdonatedAmount(user){
  return await loadPointsdonatedAmount(user);
}

export async function loadPointsdonatedAmount(user) {
  try {
    const webApp = await getWebAppWithLogin();
    const data = await webApp.getDonationAmount(Principal.fromText(user));
    return parseInt(data);
  } catch (error) {
    console.log(error);
    return 0;
  }
}