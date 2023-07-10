import styles from '../../styles/shop/shop.module.scss';
import Navigation2 from '@components/Navigation2';
import Footer from '@components/Footer';

export default function Shop() {
    return (
        <div>
            <Navigation2 />
            <div className={styles.container}>
                <img src="/images/WaterPilot.png" className={styles.image}></img>
                <div className={styles.productInfo}>
                    <h1 className={styles.title}>Water Pilot</h1>
                    <p className={styles.price}>250$</p>
                    <p className={styles.description}>Description de votre produit ici. Ceci est une super description sur produit que Smart Garden propose</p>
                    <button className={styles.button}>Ajouter au panier</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

