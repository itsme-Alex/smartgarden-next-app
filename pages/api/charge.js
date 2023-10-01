import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const charge = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { amount } = req.body;

      // Créer une session de paiement
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Water Pilot 2023",
                description:
                  "Le Water Pilot est le système d'arrosage automatique idéal pour votre jardin !",
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://localhost:3000",
        cancel_url: "https://localhost:3000",
      });

      console.log("Checkout Session", session);
      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
export default charge;
