import { useConnected } from "@context/ConnectedContext";
import { getElectrovalve } from "@utils/data-fetcher";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard/schedule.module.scss";
import Switch from "./utils/Switch";

const Schedule = () => {
  const [electrovalves, setElectrovalves] = useState([]);
  const { updateConnection } = useConnected();
  const [scheduleActivated, setScheduleActivated] = useState(false);

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
    console.log("scheduleId", electrovalves);
    console.log(
      electrovalves[0]?.valveSettings.schedules[0]["@id"].split("/").pop()
    );
  }, [electrovalves]);

  return (
    <div className={styles.container}>
      <h2>Planifications</h2>
      {electrovalves.length === 0 ? (
        <p>Aucune électrovanne enregistrée en base de données.</p>
      ) : (
        electrovalves.map((electrovalve) => (
          <div key={electrovalve.id} className={styles.itemContainer}>
            <h3>{electrovalve.name}</h3>
            <div className={styles.scheduleContainer}>
              {electrovalve.valveSettings.schedules
                ?.sort((a, b) => a.hourStart - b.hourStart)
                .map((schedule) => (
                  <div key={schedule["@id"]} className={styles.schedule}>
                    <div>{schedule.hourStart}h</div>
                    <div>{schedule.hourEnd}h</div>
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
                    <Switch
                      endPoint="schedules"
                      property="isActivated"
                      bool={schedule.isActivated}
                      id={schedule["@id"].split("/").pop()}
                    />
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
