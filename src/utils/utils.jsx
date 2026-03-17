export function isLoggedIn(AdminData) {
  let session = getObject(AdminData) || "{}";
  // console.log("Raw session string ", session);

  try {
    session = JSON.parse(session);
  } catch (e) {
    console.error("Failed to parse session:", e);
    return "";
  }

  let accessToken = session?.data?.[0]?.jwtToken || "";
  // console.log("Extracted Token ", accessToken);
  return accessToken;
}

export function getObject(key) {
  if (window && window.sessionStorage) {
    return window.sessionStorage.getItem(key);
  }
  return null;
}

//   export function getObject(key) {
//   if (window && window.sessionStorage) {
//     return window.sessionStorage.getItem(key);
//   }
// }
