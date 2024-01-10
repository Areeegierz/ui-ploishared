import { decodeToken } from "react-jwt";

var mode = "prod";
export const API_URL =
  mode === "prod"
    ? `https://localhost:7111/api/`
    : `https://bangsonmarket.cipcloud.net:9000/api/`;
export const BASE_URL =
  mode === "dev"
    ? `https://localhost:7111`
    : `https://bangsonmarket.cipcloud.net:9000`;

export const authUser = getAuth();
function getAuth() {
  const token = localStorage.getItem("user");
  const decode = decodeToken(token);
  return JSON.parse(decode);
}
