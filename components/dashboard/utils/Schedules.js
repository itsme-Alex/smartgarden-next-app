import { useConnected } from "@context/ConnectedContext";
import { getElectrovalve } from "@utils/data-fetcher";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard/schedule.module.scss";

const Schedule = () => {
  const [electrovalves, setElectrovalves] = useState([]);
  const { updateConnection } = useConnected();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getElectrovalve();
        const transformedData = data["hydra:member"].map((electrovalve) => ({
          ...electrovalve,
          id: electrovalve["@id"].split("/").pop(),
        }));
        setElectrovalves(transformedData);
      } catch (error) {
        if (error === 401) updateConnection(false);
      }
    }
    fetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("electrovalves", electrovalves);
  }, [electrovalves]);

  return (
    <div className={styles.container}>
      <h2>Planifications</h2>
      {electrovalves.length === 0 ? (
        <p>Aucune électrovanne enregistrée en base de données.</p>
      ) : (
        electrovalves.map((electrovalve) => (
          <div key={electrovalve.id}>
            <h3>{electrovalve.name}</h3>
            <div className={styles.scheduleContainer}>
              {electrovalve.valveSettings.schedules?.map((schedule) => (
                <div key={schedule.id} className={styles.schedule}>
                  <div>{schedule.hourStart}</div>
                  <div>{schedule.hourEnd}</div>
                  <div className={styles.jours}>
                    <div
                      className={
                        schedule.days?.includes("Lundi") ? styles.red : ""
                      }
                    >
                      L
                    </div>
                    <div
                      className={
                        schedule.days?.includes("Mardi")
                          ? styles.red
                          : styles.normal
                      }
                    >
                      M
                    </div>
                    <div
                      className={
                        schedule.days?.includes("Mercredi")
                          ? styles.red
                          : styles.normal
                      }
                    >
                      M
                    </div>
                    <div
                      className={
                        schedule.days?.includes("Jeudi")
                          ? styles.red
                          : styles.normal
                      }
                    >
                      J
                    </div>
                    <div
                      className={
                        schedule.days?.includes("Vendredi")
                          ? styles.red
                          : styles.normal
                      }
                    >
                      V
                    </div>
                    <div
                      className={
                        schedule.days?.includes("Samedi")
                          ? styles.red
                          : styles.normal
                      }
                    >
                      S
                    </div>
                    <div
                      className={
                        schedule.days?.includes("Dimache")
                          ? styles.red
                          : styles.normal
                      }
                    >
                      D
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Schedule;
