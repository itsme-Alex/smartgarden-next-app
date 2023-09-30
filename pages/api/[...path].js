import httpProxy from "http-proxy";
import Cookies from "cookies";
import { URL } from "url";
import jwt from "jsonwebtoken";

const API_URL = process.env.API_URL; //"http://localhost:8080";
const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiProxy = async (req, res) => {
  const myURL = new URL(req.url, "http://example.com"); //  fournir une base si req.url est un chemin relatif
  const pathname = myURL.pathname;
  const isConnectedPath = pathname === "/api/isConnected";
  const isLogoutPath = pathname === "/api/logout";

  if (isConnectedPath) {
    const cookies = new Cookies(req, res);
    const token = cookies.get("BEARER");
    const decodedToken = jwt.decode(token);
    const currentTime = Date.now() / 1000;

    decodedToken && decodedToken.exp > currentTime
      ? res.status(200).send("Valid token")
      : res.status(401).send("Invalid token");
  }

  if (isLogoutPath) {
    const cookies = new Cookies(req, res);
    cookies.set("BEARER", "", { expires: new Date(0) }); // Effacer le cookie
    res.status(200).send("Logged out successfully");
  }

  return new Promise((resolve, reject) => {
    req.headers.host = new URL(API_URL).host;

    proxy.once("error", reject);
    proxy.web(req, res, {
      target: API_URL,
      autoRewrite: true,
      selfHandleResponse: false,
    });
  });
};

export default apiProxy;
