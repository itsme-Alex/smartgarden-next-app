import Cookies from "cookies";
import jwt from "jsonwebtoken";

const apiIsConnected = (req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("BEARER");
  const decodedToken = jwt.decode(token);
  const currentTime = Date.now() / 1000;

  decodedToken && decodedToken.exp > currentTime
    ? res.status(200).send("Valid token")
    : res.status(401).send("Invalid token");
};

export default apiIsConnected;
