'use client'

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from "../../styles/showcase/welcome.module.scss";

const imagesTexts = [
  {
    src: {
      desktop: "/images/WaterPilot.png",
      mobile: "/images/WaterPilot.png",
    },
    title: "LE WATER PILOT",
    text: "Un système d'arrosage intelligent",
    button: "Découvrir"
  },
  {
    src: {
      desktop: "/images/ORDIWP2.png",
      mobile: "/images/OrdiWP.png",
    },
    title: "DASHBOARD",
    text: "Contrôle de l'arrosage à distance",
    button: "Découvrir"
  },
  {
    src: {
      desktop: "/images/arrosage.png",
      mobile: "/images/arrosage.png",
    },
    title: "ARROSAGE",
    text: "Le système s'occupe de vos plantes",
    button: "Découvrir"
  },
];

export default function Welcome() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((oldIndex) => (oldIndex + 1) % imagesTexts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <AnimatePresence mode='every'>
        <motion.div 
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className={`${styles.image} ${styles.imageDesktop}`}
          style={{backgroundImage: `url(${imagesTexts[index].src.desktop})`}}
        />
        <motion.div 
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className={`${styles.image} ${styles.imageMobile}`}
          style={{backgroundImage: `url(${imagesTexts[index].src.mobile})`}}
        />
        <div className={styles.overlay}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
            >
              <p className={styles.text}>{imagesTexts[index].text}</p>
              <h1 className={styles.title}>{imagesTexts[index].title}</h1>
              <a href="#about" className={styles.button}>{imagesTexts[index].button}</a>
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatePresence>
    </div>
  );
}