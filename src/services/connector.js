import { AuthClient } from "@dfinity/auth-client";
import { idlFactory } from "../idl/service.did";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

const webAppId = "7z2b7-ciaaa-aaaap-ahxba-cai";
const webAppIDL = idlFactory;

let identity;

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
export async function getCurrentUserPrincipal() {
  if (identity != "") {
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

// export async function addUserPrincipal() {
//   const webApp = await getWebAppWithLogin();
//   if (identity != "") {
//     await webApp.addUserPrincipal(
//       "Nasi",
//       Principal.fromText(
//         "xloe2-6klms-3bj7i-i2teg-sgjan-scmva-aynwj-z3yyn-qutw5-vlugb-5ae"
//       )
//     );
//     await getUserPrincipalArray();
//   }
// }

// export async function getUserPrincipalArray() {
//   const webApp = await getWebAppWithoutLogin();
//   const data = await webApp.getUserPrincipalArray();
//   const structured = structuring(data);
//   console.log(structured);
// }

// const structuring = (data) => {
//   const list = data.map((d) => ({
//     username: d.username.toString(),
//     wallet: d.wallet.toString(),
//     princi: d.princi.toString(),
//   }));
//   return list;
// };
