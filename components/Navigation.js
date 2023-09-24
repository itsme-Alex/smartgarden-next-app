"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "../styles/navigation.module.scss";
import { motion } from "framer-motion";
import { isJwtValid } from "@/utils/isconnected";
import { useRouter } from "next/navigation";

const topVariants = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: 45, translateY: 10.5 },
};

const middleVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomVariants = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: -45, translateY: -10.5 },
};

const menuVariants = {
  open: { x: "20%" },
  closed: { x: "100%" },
};

const linkVariants = {
  open: { opacity: 1, transition: { delay: 0.2 }, pointerEvents: "auto" },
  closed: { opacity: 0, pointerEvents: "none" },
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const router = useRouter();

  const scrollListener = useCallback(() => {
    const isTop = window.scrollY <= 50;
    setIsTop(isTop);
  }, []);

  useEffect(() => {
    const isConnected = async () => {
      const isValid = await isJwtValid();
      setUserIsAuthenticated(isValid);
      if (!isValid) router.push("/");
    };
    isConnected();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  const handleLogout = () => {
    const isLogout = async () => {
      const res = await fetch("/api/logout");
      console.log("logout", res);
      if (res.ok) {
        setUserIsAuthenticated(false);
      }
    };
    isLogout();
    router.push("/");
  };

  return (
    <nav className={`${styles.navbar} ${isTop ? styles.transparent : ""}`}>
      <div
        className={`${styles.navLeft} ${
          isTop ? styles.linkTop : styles.linkScrolled
        }`}
      >
        <Link href="/">Smart Garden</Link>
      </div>
      <div className={styles.navRight}>
        <Link className={isTop ? styles.linkTop : styles.linkScrolled} href="/">
          Accueil
        </Link>
        <Link
          className={isTop ? styles.linkTop : styles.linkScrolled}
          href="#about"
        >
          À propos
        </Link>
        <Link
          className={isTop ? styles.linkTop : styles.linkScrolled}
          href="#contact"
        >
          Contact
        </Link>
        <Link
          className={isTop ? styles.linkTop : styles.linkScrolled}
          href="/shop"
        >
          Boutique
        </Link>
        {!userIsAuthenticated && (
          <Link
            className={isTop ? styles.linkTop : styles.linkScrolled}
            href="/login"
          >
            Connexion
          </Link>
        )}
        {userIsAuthenticated && (
          <>
            <Link
              className={isTop ? styles.linkTop : styles.linkScrolled}
              href="/dashboard"
            >
              Dashboard
            </Link>
            <a
              className={isTop ? styles.linkTop : styles.linkScrolled}
              onClick={handleLogout}
              href="#"
            >
              Déconnexion
            </a>
          </>
        )}
      </div>
      <div className={styles.hamburgerMenu} onClick={() => setIsOpen(!isOpen)}>
        <motion.div
          className={`${styles.burgerDiv} ${
            isTop ? styles.burgerTop : styles.burgerScrolled
          }`}
          variants={topVariants}
          animate={isOpen ? "open" : "closed"}
        />
        <motion.div
          className={`${styles.burgerDiv} ${
            isTop ? styles.burgerTop : styles.burgerScrolled
          }`}
          variants={middleVariants}
          animate={isOpen ? "open" : "closed"}
        />
        <motion.div
          className={`${styles.burgerDiv} ${
            isTop ? styles.burgerTop : styles.burgerScrolled
          }`}
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
          <Link href="#home">Accueil</Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link href="#about">À propos</Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link href="#contact">Contact</Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link href="/shop">Boutique</Link>
        </motion.div>
        {!userIsAuthenticated && (
          <motion.div variants={linkVariants}>
            <Link href="/login">Connexion</Link>
          </motion.div>
        )}
        {userIsAuthenticated && (
          <>
            <motion.div variants={linkVariants}>
              <Link href="/dashboard">Dashboard</Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <a onClick={handleLogout} href="#">
                Déconnexion
              </a>
            </motion.div>
          </>
        )}
      </motion.div>
    </nav>
  );
}
