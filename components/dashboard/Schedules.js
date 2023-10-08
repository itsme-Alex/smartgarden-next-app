import { useConnected } from "@context/ConnectedContext";
import { deleteData, getElectrovalve } from "@utils/data-fetcher";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard/schedule.module.scss";
import Switch from "./utils/Switch";
import CustomButton from "./utils/CustomButton";
import { AnimatePresence, motion } from "framer-motion";
import AddScheduleForm from "./Forms/AddScheduleForm";

const Schedules = () => {
  const [electrovalves, setElectrovalves] = useState([]);
  const { updateConnection } = useConnected();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);

  // fonction qui ouvre le modal d'ajout d'une électrovalve
  const handleAddSchedule = () => {
    setModalIsOpen(true);
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
  }, [updateKey]);

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
                    <div>
                      {(String(schedule.hourStart).length < 2 ? "0" : "") +
                        schedule.hourStart}
                      h
                    </div>
                    <div>
                      {(String(schedule.hourEnd).length < 2 ? "0" : "") +
                        schedule.hourEnd}
                      h
                    </div>
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
                    <div
                      className={styles.deleteButton}
                      onClick={() =>
                        handleDelete(
                          "schedules",
                          schedule["@id"].split("/").pop()
                        )
                      }
                    >
                      x
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
      <CustomButton
        text="Ajouter une planification"
        variant="default"
        onClick={handleAddSchedule}
      />

      {/*MODAL*/}
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className={styles.modalContent}>
              {modalAction === "addElectrovalve" && (
                <AddScheduleForm
                  closeModal={closeModal}
                  onElectrovalveAdded={handleElectrovalveAdded}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedules;
