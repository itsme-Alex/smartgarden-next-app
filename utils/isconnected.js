// Obtenez le token JWT depuis le cookie
const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match && match[2];
};

// Vérifiez la validité du JWT
export const isJwtValid = async () => {
  try {
    const isConnected = await fetch("/api/isConnected");
    if (isConnected.ok) {
      return true;
    } else {
      throw new Error("JWT non valide ou expiré");
    }
  } catch (error) {
    console.log("non connecté");
    return false;
  }
};
