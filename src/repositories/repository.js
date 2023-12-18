import { decodeToken } from "react-jwt";

export const API_URL = `https://ploisharedapi.ninenap.com/api/`;
// export const API_URL = `https://localhost:7111/api/`;
export const authUser = getAuth();
function getAuth() {
  const token = localStorage.getItem("user");
  const decode = decodeToken(token);
  return JSON.parse(decode);
}

// export const BASE_URL = `https://localhost:7111`;
export const BASE_URL = `https://ploisharedapi.ninenap.com`;
