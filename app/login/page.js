"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/authenticate/authenticate.module.scss";
import Link from "next/link";
import Navigation2 from "@components/Navigation2";
import Footer from "@components/Footer";
import Image from "next/image";
import profilePic from "../../public/images/herbe.png";
import { useRouter } from "next/navigation";
import { useConnected } from "@context/ConnectedContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { state, checkConnection, updateConnection } = useConnected();

  //TODO: message si erreur mdp ou mail
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };
    try {
      const res = await fetch("/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        // const data = await res.json();
        updateConnection(true);
        // Redirection vers la page dashboard
        router.push("/dashboard");
      } else {
        console.log("res.status", res.ok);
        // Gérer les erreurs si nécessaire
        console.error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
    }
  };

  return (
    <div>
      <Navigation2 />
      <div className={styles.container}>
        <Image src={profilePic} alt="grass pictures" className={styles.image} />
        <div>
          <h2 className={styles.title}>Connexion</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              Connexion
            </button>
            <p className={styles.loginLink}>
              Pas encore de compte ? <Link href="/register">S'inscrire</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
