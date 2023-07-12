import styles from '../../styles/authenticate/authenticate.module.scss';
import Link from 'next/link';
import Navigation2 from '@components/Navigation2';
import Footer from '@components/Footer';

export default function Register() {
    return (
        <div>
            <Navigation2 />
            <div className={styles.container}>
                <img src="/images/herbe.png" className={styles.image}></img>
                <div>
                    <h2 className={styles.title}>Inscription</h2>
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <input type="text" className={styles.input} placeholder="Nom" />
                        </div>
                        <div className={styles.inputGroup}>
                            <input type="email" className={styles.input} placeholder="Email" />
                        </div>
                        <div className={styles.inputGroup}>
                            <input type="password" className={styles.input} placeholder="Mot de passe" />
                        </div>
                        <button type="submit" className={styles.button}>S'inscrire</button>
                        <p className={styles.loginLink}>Vous avez déjà un compte ? <Link href="/login">Se connecter</Link></p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}


