"use client";
import styles from "../../styles/shop/shop.module.scss";
import Navigation2 from "@components/Navigation2";
import Footer from "@components/Footer";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Shop() {
  const handlePurchase = async () => {
    const stripe = await stripePromise;
    console.log("stripe", stripe);
    const response = await fetch("/api/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 12500, // en centimes
      }),
    });

    const session = await response.json();
    console.log("session", session);
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div>
      <Navigation2 />
      <div className={styles.page}>
        <div className={styles.container}>
          <Image
            src="/images/WaterPilot.png"
            alt="image du waterpilot"
            className={styles.image}
            width={500}
            height={500}
            priority={true}
          />
          <div className={styles.details}>
            <h2 className={styles.title}>Water Pilot 2023</h2>
            <p className={styles.price}>$125</p>
            <p className={styles.description}>
              Le Water Pilot est le système d'arrosage automatique idéal pour
              votre jardin !
            </p>
            <button className={styles.button} onClick={handlePurchase}>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
