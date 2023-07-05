import Link from 'next/link'
import styles from '../../styles/showcase/about.module.scss'

export default function About() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>À PROPOS</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Brand identity</h3>
          <p className={styles.cardParagraph}>
            Bringing the history of your brand to the forefront gives an emotional dimension to your visual identity, which is essential today more than ever in today's digital landscape.
          </p>
          <Link className={styles.cardLink} href={`/`}>
            En savoir plus
          </Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Technology</h3>
          <p className={styles.cardParagraph}>
            Bringing the history of your brand to the forefront gives an emotional dimension to your visual identity, which is essential today more than ever in today's digital landscape. Bringing the history of your brand to the forefront.
          </p>
          <Link className={styles.cardLink} href={`/`}>
            En savoir plus
          </Link>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>UX/UI Design</h3>
          <p className={styles.cardParagraph}>
            Bringing the history of your brand to the forefront gives an emotional dimension to your visual identity.
          </p>
          <Link className={styles.cardLink} href={`/`}>
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}
