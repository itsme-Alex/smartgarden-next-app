import httpProxy from "http-proxy";
import { URL } from "url";

const API_URL = process.env.API_URL; //"http://localhost:8080";
console.log("API_URL", API_URL);
const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiProxy = async (req, res) => {
  req.url = req.url.replace("/proxy", "");
  console.log("req.url", req.url);

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
