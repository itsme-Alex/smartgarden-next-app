// apiActions.js
const API_URL = `/api/electrovalves`;

export const getElectrovalve = async (token) => {
  try {
    const apiRes = await fetch(API_URL, {
      method: "GET",
    });

    if (!apiRes.ok) {
      console.log(apiRes);
      throw new Error(`HTTP error! status: ${apiRes.status}`);
    }

    return await apiRes.json();
  } catch (err) {
    console.log(err);
    throw err; // Propagez l'erreur pour pouvoir la gérer dans le composant.
  }
};
export const addElectrovalve = async (data, token) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de l'électrovanne");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête POST:", error);
    throw error;
  }
};
