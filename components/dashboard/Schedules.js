import { useConnected } from "@context/ConnectedContext";
import { deleteData, getElectrovalve } from "@utils/data-fetcher";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard/schedule.module.scss";
import Switch from "./utils/Switch";
import CustomButton from "./utils/CustomButton";
import { AnimatePresence, motion } from "framer-motion";
import AddScheduleForm from "./Forms/AddScheduleForm";

const Schedules = ({ electrovalves, setElectrovalves }) => {
  const { updateConnection } = useConnected();
  const [updateKey, setUpdateKey] = useState(0);
  const [dynamicSchedules, setDynamicSchedules] = useState([]);

  const handleAddSchedule = (valveId) => {
    setDynamicSchedules((prevSchedules) => {
      if (!prevSchedules.includes(valveId)) {
        return [...prevSchedules, valveId];
      }
      return prevSchedules; // retourne le tableau inchangé si scheduleId y est déjà
    });
  };

  const handleDelete = async (endPoint, id) => {
    try {
      await deleteData(endPoint, id);
      // Mettre à jour la liste des électrovannes après la suppression
      setUpdateKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };
  useEffect(() => {
    console.log("dynamicSchedules", dynamicSchedules);
  }, [dynamicSchedules]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getElectrovalve();

        setElectrovalves(data);
      } catch (error) {
        if (error === 401) updateConnection(false);
      }
    }
    fetchData();

    //eslint-disable-next-line
  }, [updateKey]);

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
                  <div key={schedule.id}>
                    <div className={styles.schedule}>
                      <div>{String(schedule.hourStart).padStart(2, "0")}h</div>
                      <div>{String(schedule.hourEnd).padStart(2, "0")}h</div>
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
                        id={schedule.id}
                      />
                      <div
                        className={styles.deleteButton}
                        onClick={() => handleDelete("schedules", schedule.id)}
                      >
                        x
                      </div>
                    </div>
                  </div>
                ))}
              {dynamicSchedules.includes(electrovalve.id) && (
                <AddScheduleForm
                  valveId={electrovalve.id}
                  settingsId={electrovalve.valveSettings.id}
                  setElectrovalves={setElectrovalves}
                  setDynamicSchedules={setDynamicSchedules}
                />
              )}
              <CustomButton
                centered={true}
                text="Ajouter une planification"
                variant="default"
                onClick={() => handleAddSchedule(electrovalve.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Schedules;
