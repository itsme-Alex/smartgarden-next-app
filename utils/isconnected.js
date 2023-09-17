import jwt from "jsonwebtoken";

// Obtenez le token JWT depuis le cookie
const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match && match[2];
};

// Vérifiez la validité du JWT
export const isJwtValid = () => {
  const token = getCookieValue("jwtToken");
  if (!token) return false;

  try {
    const decodedToken = jwt.decode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken && decodedToken.exp > currentTime;
  } catch {
    return false;
  }
};
