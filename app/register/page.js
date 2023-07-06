import styles from "../../styles/register.module.scss";

const Register = () => (
  <div className={styles.container}>
    <div className={styles.image_gauche}></div>

    <div className={styles.connexion}>
      <b className={styles.smartGarden}>SMART GARDEN</b>

      <div className={styles.back_signup}>
        <div className={styles.button}>
          <img className={styles.back} alt="" src="images/back.png" />
          <b className={styles.back}>Back</b>
        </div>
        <div className={styles.iHaveAnContainer}>
          <b>I have an account!</b>
          <b className={styles.signUp}>Sign Up</b>
        </div>
      </div>

      <div className={styles.crezVotreCompte}>Créez votre compte</div>

      <div className={styles.form}>
        <div>
          <b className={styles.text}>Email</b>
          <div className={styles.text_input}>
            <div className={styles.inputField}>
              <img
                className={styles.vuesaxbolduserIcon}
                alt="User Icon"
                src="images/vuesaxbolduser.png"
              />
              <input
                type="text"
                className={styles.email}
                placeholder="Type here"
              />
            </div>
          </div>
        </div>

        <div>
          <b className={styles.text}>Mot de passe</b>
          <div className={styles.text_input}>
            <div className={styles.cadenas_Parent}>
              <img
                className={styles.cadenas}
                alt="Password Icon"
                src="images/vuesaxboldlock.png"
              />
              <input
                type="password"
                className={styles.password}
                placeholder="*****************"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.remember_password}>
        <div className={styles.checkbox}>
          <input type="checkbox" className={styles.checkboxChild} />
          <b className={styles.Remember_me}> Remember me</b>
        </div>
        <div className={styles.forgotPassword}>Forgot password?</div>
      </div> */}
      <div className={styles.bouton}>
        <div className={styles.se_connecter}>Se connecter</div>
        <img
          className={styles.fleche_connexion}
          alt=""
          src="images/fleche-connexion.png"
        />
      </div>
    </div>
  </div>
);

export default Register;
