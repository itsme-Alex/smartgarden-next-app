// 
import styles from "../../styles/shop.module.scss";
import Navigation from "@/components/Navigation";

const shop = () => {
  return (
    
    <div className={styles.rectangleParent}>
      <div className={styles.frameChild} />
      <div className={styles.rectangleGroup}>
        <div className={styles.frameItem} />
        <div className={styles.frameInner} />
        <img className={styles.menuIcon} alt="" src="images/menu@2x.png" />
        <b className={styles.shiopMens}>
       
          CAPTEURS PROGRAMMATION - CONNECTIVITÉ -
        </b>
      </div>
      <b className={styles.classicSeries}>
        <p className={styles.classic}>CLASSIC</p>
        <p className={styles.series}>
          <span>{`  `}</span>
          <span className={styles.series1}>SERIES</span>
        </p>
      </b>
 
      <div className={styles.products}>
        <b className={styles.classicSeries45mm}>CLASSIC SERIES-45MM</b>
        <div className={styles.waterPilot}>WATER PILOT</div>
        <div className={styles.div}>€250.00</div>
        {/* <div className={styles.reviews}>
          <div className={styles.stars}>
            <img className={styles.starIcon} alt="" src="images/star@2x.png" />
            <img className={styles.starIcon} alt="" src="images/star1@2x.png" />
            <img className={styles.starIcon} alt="" src="images/star2@2x.png" />
            <img className={styles.starIcon} alt="" src="images/star3@2x.png" />
            <img className={styles.starIcon} alt="" src="images/star4@2x.png" />
          </div>
          <b className={styles.kReviews}>+1K REVIEWS</b>
        </div> */}
        <div className={styles.dcouvrezLavenirDeContainer}>
          <p className={styles.series}>
            Découvrez l'avenir de l'arrosage avec WaterPilot.
          </p>
          <p className={styles.series}>
            {" "}
            Grâce à sa technologie avancée, il mesure l'humidité du sol et se
            connecte
          </p>
          <p
            className={styles.series}
          >{` à la station météo pour des prévisions précises. Votre jardin est automatiquement `}</p>
          <p className={styles.series}>
            arrosé selon ses besoins, sans gaspillage. Profitez d'un jardin
            luxuriant, sans stress
          </p>
          <p className={styles.series}>
            {" "}
            ni soucis. WaterPilot, l'arrosage intelligent qui fait toute la
            différence.
          </p>
        </div>
        <div className={styles.solidButton}>
          <b className={styles.acheter}>ACHETER</b>
        </div>
      </div>
     
      <img className={styles.icon} alt="" src="images/3551823386-1@2x.png" />
      
    </div>
  );
};

export default shop;

