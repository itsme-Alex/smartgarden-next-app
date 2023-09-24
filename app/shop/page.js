import styles from "../../styles/shop/shop.module.scss";
import Navigation2 from "@components/Navigation2";
import Footer from "@components/Footer";
import Image from "next/image";

export default function Shop() {
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
          />
          <div className={styles.details}>
            <h2 className={styles.title}>Water Pilot 2023</h2>
            <p className={styles.price}>$125</p>
            <p className={styles.description}>
              Le Water Pilot est le système d'arrosage automatique idéal pour
              votre jardin !
            </p>
            <button className={styles.button}>Ajouter au panier</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
