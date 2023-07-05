'use client'

import { useState } from 'react';
import Link from 'next/link'
import styles from '../styles/navigation.module.scss'

export default function Navigation() {
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navLeft}>
                <Link href="/">
                Smart Garden
                </Link>
            </div>
            <div className={styles.navRight}>
                <Link href="#home">
                    Accueil
                </Link>
                <Link href="#portfolio">
                    Découvrir
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
            <div className={styles.hamburgerMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}

