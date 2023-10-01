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
  req.url = req.url.replace("/proxy", "");

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
