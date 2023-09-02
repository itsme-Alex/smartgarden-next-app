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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

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
                onChange={(e) => setPassword(e.target.value)}
              />
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
