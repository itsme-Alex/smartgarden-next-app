"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/dashboard/settings.module.scss";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faFaucetDrip } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

import SettingsButton from "@/components/dashboard/utils/SettingsButton";
import Switch from "@/components/dashboard/utils/Switch";
import SettingsSlider from "@/components/dashboard/utils/SettingsSlider";
import { getElectrovalve } from "@utils/data-fetcher";
import CustomButton from "@components/dashboard/utils/CustomButton";
import AddElectrovalveForm from "@components/dashboard/Forms/AddElectroValveForm";
import Cookies from "js-cookie";

export default function Settings() {
  const [electrovalves, setElectrovalves] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedElectrovalve, setSelectedElectrovalve] = useState(null);
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getElectrovalve();
        console.log("data", data);
        setElectrovalves(data["hydra:member"]);
        console.log("data", data["hydra:member"]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const openElectrovalveSettings = (electrovalveId, electrovalveName) => {
    setModalIsOpen(true);
    setSelectedElectrovalve({ name: electrovalveName, id: electrovalveId });
    setModalAction("settingsSlider");
  };

  const handleWater = () => {
    console.log("Activation de l'arrosage...");
  };

  const handleAddElectrovalve = () => {
    setModalAction("addElectrovalve");
    setModalIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <h2>Panneau de contrôle</h2>
      {electrovalves.length === 0 ? (
        <p>Aucune électrovanne enregistrée en base de données.</p>
      ) : (
        electrovalves.map((electrovalve) => (
          <div key={electrovalve.id} className={styles.valveContainer}>
            <div>
              <p>
                Circuit {electrovalve.position} : {electrovalve.name}
              </p>
            </div>
            <div className={styles.buttonPanel}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SettingsButton
                  icon={faSliders}
                  onClick={() =>
                    openElectrovalveSettings(electrovalve.id, electrovalve.name)
                  }
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SettingsButton destination="schedules" icon={faClock} />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SettingsButton icon={faFaucetDrip} onClick={handleWater} />
              </motion.div>
              <Switch isAutomatic={electrovalve.isAutomatic} />
            </div>
          </div>
        ))
      )}
      <CustomButton text="Ajouter" onClick={handleAddElectrovalve} />
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className={styles.modalContent}>
              {modalAction === "addElectrovalve" && <AddElectrovalveForm />}
              {modalAction === "settingsSlider" && (
                <SettingsSlider valve={selectedElectrovalve} />
              )}
              <button
                onClick={() => {
                  setModalIsOpen(false);
                  setModalAction(null); // Réinitialisez l'action lors de la fermeture de la modale
                }}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
