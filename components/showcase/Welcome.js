import styles from "../../styles/welcome.module.scss";

export default function Welcome() {
    return (
        <div className={styles.container}>
          <div className={styles.topContent}>
            <h1>WATER PILOT</h1>
            <p>L'audace végétale à son apogée !</p>
          </div>
          <div className={styles.middleContent}>
            <div className={styles.textContent}>
              <p>Préparez-vous à un spectacle grandiose, à une explosion de vie et d'extravagance dans votre jardin !</p>
              <p>Découvrir le produit...</p>
            </div>
            <img src="/images/greenade.png" alt="Welcome" className={styles.greenade}/>
          </div>
          <h2>GREENADE!</h2>
        </div>
    );
}