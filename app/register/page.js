"use client";
import { useState } from "react";
import styles from "../../styles/authenticate/authenticate.module.scss";
import Link from "next/link";
import Navigation2 from "@components/Navigation2";
import Footer from "@components/Footer";
import Image from "next/image";
import profilePic from "../../public/images/herbe.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };
    // TODO : ajouter la ville et coordonnées GPS
    //TODO: se connecter automatiquement apres l'inscription
    try {
      const res = await fetch("http://127.0.0.1:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);

      // Vous pouvez ajouter une logique supplémentaire ici pour gérer la réponse de l'API.
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(e.target.value);

    setPasswordValidations({
      minLength: value.length >= 15,
      upperCase: /[A-Z]/.test(value),
      lowerCase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value),
    });
  };

  return (
    <div>
      <Navigation2 />
      <div className={styles.container}>
        <Image src={profilePic} alt="grass pictures" className={styles.image} />
        <div>
          <h2 className={styles.title}>Inscription</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.input} placeholder="Nom" />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                className={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChange={handlePasswordChange}
              />
              <ul className={styles.passwordRequirements}>
                <li
                  className={passwordValidations.minLength ? styles.valid : ""}
                >
                  15 caractères
                </li>
                <li
                  className={passwordValidations.upperCase ? styles.valid : ""}
                >
                  1 majuscule
                </li>
                <li
                  className={passwordValidations.lowerCase ? styles.valid : ""}
                >
                  1 minuscule
                </li>
                <li className={passwordValidations.number ? styles.valid : ""}>
                  1 chiffre
                </li>
                <li
                  className={
                    passwordValidations.specialChar ? styles.valid : ""
                  }
                >
                  1 caractère spécial
                </li>
              </ul>
            </div>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.input} placeholder="Ville" />
            </div>
            <button type="submit" className={styles.button}>
              S'inscrire
            </button>
            <p className={styles.loginLink}>
              Vous avez déjà un compte ? <Link href="/login">Se connecter</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
