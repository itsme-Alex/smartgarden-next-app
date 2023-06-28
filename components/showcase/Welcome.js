import styles from "../../styles/welcome.module.scss";

export default function Welcome() {
    return (
        <div className={styles.container}>
          <div className={styles.topContent}>
            <h1>WATER PILOT</h1>
            <p>L'audace végétale à son apogée !</p>
          </div>
          <div className={styles.imageContainer}>
            <img src="/images/greenade.png" alt="Greenade" className={styles.greenade}/>
            <img src="/images/shadow.png" alt="Shadow" className={styles.shadowGreenade}/>
          </div>
          <div className={styles.textContent}>
            <p>Préparez-vous à un spectacle grandiose, à une explosion de vie et d'extravagance dans votre jardin !</p>
            <a href="/shop">Découvrir le produit...</a>
          </div>
          <h2>GREENADE!</h2>
        </div>
    );
}