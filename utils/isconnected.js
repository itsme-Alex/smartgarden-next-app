import jwt from "jsonwebtoken";

// Obtenez le token JWT depuis le cookie
const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match && match[2];
};

// Vérifiez la validité du JWT
export const isJwtValid = async () => {
  const isConnected = await fetch("/api/isConnected");

  if (isConnected.ok) {
    return true;
  } else {
    return false;
  }
};
//TODO: faire une route api pour vérifier si je suis connecté
