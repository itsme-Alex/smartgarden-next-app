// Navigation.js
import Link from 'next/link'
import styles from '../styles/navigation.module.scss'

export default function Navigation() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navLeft}>
                <p>Smart Garden</p>
            </div>
            <div className={styles.navRight}>
                <Link href="#home">
                    Accueil
                </Link>
                <Link href="#portfolio">
                    Portfolio
                </Link>
                <Link href="#about">
                    À propos
                </Link>
                <Link href="#contact">
                    Contact
                </Link>
                <Link href="/shop">
                    Boutique
                </Link>
                <Link href="/register">
                    S'inscrire
                </Link>
            </div>
        </nav>
    )
}
