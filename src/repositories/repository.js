import { decodeToken } from "react-jwt";

var mode = "deploy";
export const API_URL =
  mode === "dev"
    ? `https://localhost:7111/api/`
    : `http://110.170.56.74:9000/api/`;
export const BASE_URL =
  mode === "dev"
    ? `https://localhost:7111/api/`
    : `http://110.170.56.74:9000/api/`;

export const authUser = getAuth();
function getAuth() {
  const token = localStorage.getItem("user");
  const decode = decodeToken(token);
  return JSON.parse(decode);
}
