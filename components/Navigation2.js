'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navigation2.module.scss';
import { motion } from "framer-motion";

const topVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 10.5},
}

const middleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
}

const bottomVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -10.5},
}

const menuVariants = {
    open: { x: "20%" },
    closed: { x: "100%" },
};

const linkVariants = {
    open: { opacity: 1, transition: { delay: 0.2 }, pointerEvents: "auto" },
    closed: { opacity: 0, pointerEvents: "none" },
};

export default function Navigation2() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar2}>
            <div className={styles.navLeft2}>
                <Link href="/">
                Smart Garden
                </Link>
            </div>
            <div className={styles.navRight2}>
                <Link href="/">
                    Accueil
                </Link>
                <Link href="/shop">
                    Boutique
                </Link>
                <Link href="/login">
                    Connexion
                </Link>
            </div>
            <div className={styles.hamburgerMenu} onClick={() => setIsOpen(!isOpen)}>
                <motion.div
                    variants={topVariants}
                    animate={isOpen ? "open" : "closed"}
                />
                <motion.div
                    variants={middleVariants}
                    animate={isOpen ? "open" : "closed"}
                />
                <motion.div
                    variants={bottomVariants}
                    animate={isOpen ? "open" : "closed"}
                />
            </div>
            <motion.div
                className={styles.menuMobile}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
            >
                <motion.div variants={linkVariants}>
                    <Link href="/">
                        Accueil
                    </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                </motion.div>
                <motion.div variants={linkVariants}>
                    <Link href="/shop">
                        Boutique
                    </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                    <Link href="/login">
                        Connexion
                    </Link>
                </motion.div>
            </motion.div>
        </nav>
    )
}