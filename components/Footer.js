import Link from 'next/link';
import styles from '../styles/footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <h3 className={styles.title}>Liens</h3>
                    <ul className={styles.list}>
                        <li><Link className={styles.link} href="/">Accueil</Link></li>
                        <li><Link className={styles.link} href="/login">Connexion</Link></li>
                        <li><Link className={styles.link} href="/shop">Boutique</Link></li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>Contact</h3>
                    <p className={styles.text}>123 rue de l'exemple, 75000 Paris</p>
                    <p className={styles.text}>Email : info@exemple.com</p>
                    <p className={styles.text}>Téléphone : +33 1 23 45 67 89</p>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>Restez à jour</h3>
                    <p className={styles.text}>Inscrivez-vous à notre newsletter pour rester informé de nos dernières nouvelles.</p>
                    <input type="email" placeholder="Email" className={styles.input} />
                    <button className={styles.button}>Souscrire</button>
                </div>
            </div>
            <p className={styles.copyright}>Copyright &copy; 2023 Smart Garden</p>
        </footer>
    );
}
