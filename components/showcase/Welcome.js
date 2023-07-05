import Image from 'next/image';
import styles from "../../styles/welcome.module.scss";

export default function Welcome() {
    return (
        <div className={styles.container}>
          <div className={styles.topContent}>
            <h1>WATER PILOT</h1>
            <p>Le tout nouveau arrosage intelligent !</p>
          </div>
          <div className={styles.imageContainer}>
            <Image src="/images/greenade.png" alt="Greenade" width={700} height={394} className={styles.greenade}/>
            <Image src="/images/shadow.png" alt="Shadow" width={710} height={400} className={styles.shadowGreenade}/>
          </div>
          <div className={styles.textContent}>
            <p>Préparez-vous à un spectacle grandiose, à une explosion de vie dans votre jardin, par Smart Garden !</p>
            <a className={styles.textLink} href="#portfolio">Découvrir</a>
          </div>
          <h2>GREENADE!</h2>
        </div>
    );
}