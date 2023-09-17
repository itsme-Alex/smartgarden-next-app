// apiActions.js
const API_URL = `http://127.0.0.1:8080/api/electrovalves`;
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTM5NDcxMTYsImV4cCI6MTY5NDMwNzExNiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWxleEBleGFtcGxlLmNvbSJ9.a_Qwzjj067v46wzdPe1Iliqr34g5tjRqy22BzhpCQPVySWGIts_XQN5yo7ET43eOpx5VsdiO8FyHk3zNH7N4WkDaYS09bKmlFlJGbuVaRBbtJPsShYCCswJem6gTrB6mEGy5VrtIjd1gZ2cgIj2lFyhSpb1jSFnVqGuJDX_TYm9nQ6cebbPPhD4ceyiZhe0Rur6xC_5s0MeumV4n089vVnzN9apwyFQviSR5mYC09WlCWd3fzlLMZD94Pl6zMpQoyUD3BcLX_Tnc3vSkR9A5k-hwasxbuM8JL54KmGi9vEQAomxdGlcBGeTslJ3o97I_1SIBoq-1GgGxTcksK8fthA";

export const getElectrovalve = async () => {
    try {
        const res = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token
            }
        });
        console.log(res)
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

