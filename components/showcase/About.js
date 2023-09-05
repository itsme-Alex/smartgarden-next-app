import Link from 'next/link'
import styles from '../../styles/showcase/about.module.scss'

export default function About() {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>À PROPOS</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Water Pilot</h3>
          <p className={styles.cardParagraph}>
            Smart Garden vous présente le Water Pilot, un système d'arrosage automatique intelligent. Le Water Pilot s'adapte aux besoins spécifiques de vos plantes, ajuste l'arrosage en fonction des conditions environnementales et favorise une croissance optimale.
          </p>     
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>L'écologie</h3>
          <p className={styles.cardParagraph}>
           Le Water Pilot est un acte de respect envers notre planète. En économisant l'eau et en favorisant une croissance plus saine des plantes, il contribue à la préservation de notre environnement. Avec le Water Pilot, vous pouvez cultiver un jardin magnifique tout en réduisant votre empreinte écologique.        
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Le tableau de bord</h3>
          <p className={styles.cardParagraph}>
           Le Water Pilot est accompagné d'une application mobile intuitive, permettant un contrôle à distance et une personnalisation des paramètres d'arrosage. Vous pouvez surveiller en temps réel l'état de votre jardin et optimiser le soin de vos plantes.      
          </p>
        </div>
      </div>
    </div>
  );
}
