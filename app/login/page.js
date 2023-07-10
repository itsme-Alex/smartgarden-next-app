import styles from '../../styles/authenticate/authenticate.module.scss';
import Link from 'next/link';
import Navigation2 from '@components/Navigation2';
import Footer from '@components/Footer';

export default function Login() {
    return (
        <div>
            <Navigation2 />
            <div className={styles.container}>
                <img src="/images/connexion.png" className={styles.image}></img>
                <div>
                    <h2 className={styles.title}>Se connecter</h2>
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <input type="email" className={styles.input} placeholder="Email" />
                        </div>
                        <div className={styles.inputGroup}>
                            <input type="password" className={styles.input} placeholder="Mot de passe" />
                        </div>
                        <button type="submit" className={styles.button}>Se connecter</button>
                        <p className={styles.loginLink}>Pas encore de compte ? <Link href="/register">S'inscrire</Link></p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}