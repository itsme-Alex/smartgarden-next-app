import styles from '../../styles/contact.module.scss'

export default function Contact() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact</h2>
      <p className={styles.paragraph}>
        Si vous souhaitez nous contacter, veuillez remplir le formulaire ci-dessous.
      </p>
      <div className={styles.form}>
        <div className={styles.left}>
          <input type="text" className={styles.input} placeholder="Name" />
          <input type="text" className={styles.input} placeholder="Phone Number" />
          <input type="text" className={styles.input} placeholder="Email" />
        </div>
        <div className={styles.right}>
          <textarea className={styles.textarea} placeholder="Message" />
          <button className={styles.button}>Send</button>
        </div>
      </div>
    </div>
  );
}
