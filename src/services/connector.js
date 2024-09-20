import { AuthClient } from "@dfinity/auth-client";
import { idlFactory } from "../idl/service.did";
import { Actor, HttpAgent } from "@dfinity/agent";
const webAppId = "bczox-miaaa-aaaap-qhypa-cai";
const webAppIDL = idlFactory;

export let identity;

// connect with internet identity
export async function connectII() {
  const authClient = await AuthClient.create();
  const iiURL = "https://identity.ic0.app";
  await new Promise((resolve, object) => {
    authClient.login({
      identityProvider: iiURL,
      onSuccess: resolve,
      onError: object,
    });
  });
  identity = authClient.getIdentity();
  console.log(identity.getPrincipal().toText());
}

// get current user principal
export function getCurrentIdentity() {
  if (identity != null) {
    const principal = identity.getPrincipal().toText();
    return principal;
  }
  return "";
}

// setup webApp to fetch data without requiring user authentication
export async function getWebAppWithoutLogin() {
  const agent = new HttpAgent({ host: "https://ic0.app" });
  const webApp = Actor.createActor(webAppIDL, {
    agent,
    canisterId: webAppId,
  });
  return webApp;
}

// setup webApp to write data (requiring user authentication)
export async function getWebAppWithLogin() {
  const agent = new HttpAgent({ identity, host: "https://ic0.app" });
  const webApp = Actor.createActor(webAppIDL, {
    agent,
    canisterId: webAppId,
  });
  return webApp;
}