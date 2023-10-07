"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard/settings.module.scss";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faFaucetDrip } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

import SettingsButton from "@/components/dashboard/utils/SettingsButton";
import Switch from "./utils/Switch";
import SettingsSlider from "@/components/dashboard/utils/SettingsSlider";
import { deleteElectrovalve, getElectrovalve } from "@utils/data-fetcher";
import CustomButton from "@components/dashboard/utils/CustomButton";
import AddElectrovalveForm from "@components/dashboard/Forms/AddElectroValveForm";
import { useConnected } from "@context/ConnectedContext";

export default function Settings() {
  const [electrovalves, setElectrovalves] = useState([]);
  const [selectedElectrovalve, setSelectedElectrovalve] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);
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
  }, [updateKey]);

  // fonction qui ouvre le modal de paramétrage d'une électrovalve
  const openElectrovalveSettings = (electrovalveName, valveSettings) => {
    setModalIsOpen(true);
    setSelectedElectrovalve({
      name: electrovalveName,
      settings: valveSettings,
      id: valveSettings["@id"].split("/").pop(),
    });
    setModalAction("settingsSlider");
  };

  const handleWater = () => {
    console.log("Activation de l'arrosage...");
  };

  // fonction qui ouvre le modal d'ajout d'une électrovalve
  const handleAddElectrovalve = () => {
    setModalAction("addElectrovalve");
    setModalIsOpen(true);
  };

  // fonction qui active le useffect de la page d'accueil pour mettre à jour la liste des électrovalves
  const handleElectrovalveAdded = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  const handleDelete = async (id) => {
    try {
      await deleteElectrovalve(id);
      // Mettre à jour la liste des électrovannes après la suppression
      setUpdateKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalAction(null);
  };

  return (
    <div className={styles.container}>
      <h2>Panneau de contrôle</h2>
      {electrovalves.length === 0 ? (
        <p>Aucune électrovanne enregistrée en base de données.</p>
      ) : (
        electrovalves.map((electrovalve) => (
          <div key={electrovalve.id} className={styles.valveContainer}>
            <div className={styles.flexContainer}>
              <p>
                Circuit {electrovalve.position} : {electrovalve.name}
              </p>
              <div
                className={styles.deleteButton}
                onClick={() => handleDelete(electrovalve.id)}
              >
                x
              </div>
            </div>
            <div className={styles.buttonPanel}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SettingsButton
                  icon={faSliders}
                  onClick={() =>
                    openElectrovalveSettings(
                      electrovalve.name,
                      electrovalve.valveSettings
                    )
                  }
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SettingsButton destination="schedules" icon={faClock} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SettingsButton icon={faFaucetDrip} onClick={handleWater} />
              </motion.div>
              <Switch
                endPoint="electrovalves"
                property="isAutomatic"
                bool={electrovalve.isAutomatic}
                id={electrovalve.id}
              />
            </div>
          </div>
        ))
      )}
      <CustomButton
        text="Ajouter une valve"
        variant="default"
        onClick={handleAddElectrovalve}
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
                <AddElectrovalveForm
                  closeModal={closeModal}
                  onElectrovalveAdded={handleElectrovalveAdded}
                />
              )}
              {modalAction === "settingsSlider" && (
                <SettingsSlider
                  valve={selectedElectrovalve}
                  closeModal={closeModal}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
