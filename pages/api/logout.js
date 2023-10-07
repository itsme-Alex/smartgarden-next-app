import Cookies from "cookies";

const logout = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("BEARER", "", { expires: new Date(0) }); // Effacer le cookie
  res.status(200).send("Logged out successfully");
};

export default logout;
