// apiActions.js
const API_URL = `http://162.19.92.61:3002/electrovalve`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MzcyOTcwLCJleHAiOjE2ODkyMzY5NzB9.1VXX8bQfE5DqR5MyS3kIo3sBVesGkqmMm673-ZwNpNk";

export const getElectrovalve = async () => {
    try {
        const res = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token
            }
        });
        return await res.json();
    } catch (err) {
        console.log(err);
        throw err; // Propagez l'erreur pour pouvoir la gérer dans le composant.
    }
};
export const addElectrovalve = async (data) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'électrovanne');
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi de la requête POST:", error);
        throw error; // Propagez l'erreur pour pouvoir la gérer dans le composant.
    }
};

