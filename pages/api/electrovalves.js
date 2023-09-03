
export default async function electrovalves (req, res) {
  try {
    console.log("Cookies reçus:", req.headers.cookie);
    let token = req.headers.cookie.split('=')[1];

    const apiRes = await fetch('http://127.0.0.1:8080/api/electrovalves', {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      method: 'GET',
    });

    if (!apiRes.ok) {
      console.log(apiRes);
      throw new Error(`HTTP error! status: ${apiRes}`);
    }

    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//TODO: add errors handler, redirect to login if not logged in