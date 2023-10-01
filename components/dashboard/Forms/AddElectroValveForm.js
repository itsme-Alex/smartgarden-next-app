// AddElectrovalveForm.js

import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "@/styles/dashboard/addElectroValveForm.module.scss";
import CustomButton from "@components/dashboard/utils/CustomButton";
import { addElectrovalve } from "@utils/data-fetcher";

const AddElectrovalveForm = ({ closeModal, onElectrovalveAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: null,
    isAutomatic: false,
    rainThreshold: 100,
    moistureThreshold: 100,
    duration: 0,
    schedules: [
      {
        hourStart: null,
        hourEnd: null,
        day: [],
        isActivated: true,
      },
    ],
  });

  const addNewSchedule = () => {
    setFormData((prevData) => ({
      ...prevData,
      schedules: [
        ...prevData.schedules,
        {
          hourStart: null,
          hourEnd: null,
          day: [],
          isActivated: false,
        },
      ],
    }));
  };

  const removeSchedule = (index) => {
    setFormData((prevData) => {
      const updatedSchedules = [...prevData.schedules];
      updatedSchedules.splice(index, 1);
      return {
        ...prevData,
        schedules: updatedSchedules,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "position" ? Number(value) : value,
    }));
  };

  const handleDayChange = (e, index) => {
    const day = e.target.name.replace("day", "");
    setFormData((prevData) => {
      const updatedSchedules = [...prevData.schedules];
      if (e.target.checked) {
        updatedSchedules[index].day.push(day);
      } else {
        updatedSchedules[index].day = updatedSchedules[index].day.filter(
          (d) => d !== day
        );
      }
      return {
        ...prevData,
        schedules: updatedSchedules,
      };
    });
  };

  const handleScheduleChange = (e, index, field) => {
    const value = e.target.value;
    setFormData((prevData) => {
      const updatedSchedules = [...prevData.schedules];
      updatedSchedules[index][field] = value;
      return {
        ...prevData,
        schedules: updatedSchedules,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation pour chaque horaire
    for (let schedule of formData.schedules) {
      if (schedule.hourStart >= schedule.hourEnd) {
        alert(
          "L'heure de début doit être inférieure à l'heure de fin pour tous les horaires."
        );
        return;
      }
      if (schedule.day.length === 0) {
        alert("Veuillez sélectionner au moins un jour pour chaque horaire.");
        return;
      }
    }

    // Validation des champs
    if (!formData.name || formData.position === null) {
      alert("Les champs name et position sont obligatoires.");
      return;
    }

    if (
      formData.rainThreshold < 0 ||
      formData.moistureThreshold < 0 ||
      formData.duration < 0
    ) {
      alert("Les seuils et la durée doivent être des nombres positifs.");
      return;
    }
    try {
      const response = await addElectrovalve(formData);
      console.log("Réponse de l'API:", response);
      alert("Électrovanne ajoutée avec succès!");

      // Fermer la modale et réinitialiser le formulaire seulement si l'ajout est réussi
      if (closeModal) closeModal();
      onElectrovalveAdded();
      setFormData({
        name: "",
        position: null,
        isAutomatic: false,
        rainThreshold: 100,
        moistureThreshold: 100,
        duration: 0,
        schedules: [],
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'électrovanne:", error);
      alert("Erreur lors de l'ajout de l'électrovanne. Veuillez réessayer.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Ajouter une électrovanne</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.basicInfoContainer}>
          <h2 className={styles.subTitle}>Informations générales</h2>
          <div>
            <label>Nom de l'électrovanne:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Position de l'électrovanne:</label>
            <input
              type="number"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Automatique:</label>
            <input
              type="checkbox"
              name="isAutomatic"
              checked={formData.isAutomatic}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  isAutomatic: e.target.checked,
                }))
              }
            />
          </div>
        </div>
        <div className={styles.thresholdContainer}>
          <h2 className={styles.title}>
            Configuration des seuils et durée d'arrosage
          </h2>
          <div className={styles.sliderGroup}>
            <label className={styles.label}>Seuil de pluie :</label>
            <div className={styles.sliderContainer}>
              <Slider
                className={styles.slider}
                min={0}
                max={100}
                value={formData.rainThreshold}
                onChange={(value) =>
                  handleInputChange({
                    target: {
                      name: "rainThreshold",
                      value,
                    },
                  })
                }
              />
              <input
                className={styles.inputValue}
                type="number"
                name="rainThreshold"
                value={formData.rainThreshold}
                onChange={handleInputChange}
                min={0}
                max={100}
                required
              />
              <p className={styles.unit}>mm</p>
            </div>
          </div>
        </div>
        <div className={styles.sliderGroup}>
          <label className={styles.label}>Seuil d'humidité :</label>
          <div className={styles.sliderContainer}>
            <Slider
              className={styles.slider}
              min={0}
              max={100}
              value={formData.moistureThreshold}
              onChange={(value) =>
                handleInputChange({
                  target: {
                    name: "moistureThreshold",
                    value,
                  },
                })
              }
            />
            <input
              className={styles.inputValue}
              type="number"
              name="moistureThreshold"
              value={formData.moistureThreshold}
              onChange={handleInputChange}
              min={0}
              max={100}
              required
            />
            <p className={styles.unit}>%</p>
          </div>
        </div>
        <div className={styles.sliderGroup}>
          <label className={styles.label}>Durée d'arrosage :</label>
          <div className={styles.sliderContainer}>
            <Slider
              className={styles.slider}
              min={0}
              max={100}
              value={formData.duration}
              onChange={(value) =>
                handleInputChange({
                  target: {
                    name: "duration",
                    value,
                  },
                })
              }
            />
            <input
              className={styles.inputValue}
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min={0}
              max={100}
              required
            />
            <p className={styles.unit}>min</p>
          </div>
        </div>

        <div className={styles.scheduleContainer}>
          <h2 className={styles.title}>Planification</h2>
          <p>Configurez les horaires d'activation de l'électrovanne.</p>

          {formData.schedules.map((schedule, index) => (
            <div key={index} className={styles.singleSchedule}>
              <div className={styles.scheduleActivation}>
                <label>Activé:</label>
                <input
                  type="checkbox"
                  checked={schedule.isActivated}
                  onChange={(e) => {
                    const updatedSchedules = [...formData.schedules];
                    updatedSchedules[index].isActivated = e.target.checked;
                    setFormData((prevData) => ({
                      ...prevData,
                      schedules: updatedSchedules,
                    }));
                  }}
                />
              </div>
              <div className={styles.scheduleTime}>
                <label>Heure de début:</label>
                <input
                  type="number"
                  name="hourStart"
                  value={schedule.hourStart}
                  onChange={(e) => handleScheduleChange(e, index, "hourStart")}
                  min="0"
                  max="23"
                  required
                />
                <label>Heure de fin:</label>
                <input
                  type="number"
                  name="hourEnd"
                  value={schedule.hourEnd}
                  onChange={(e) => handleScheduleChange(e, index, "hourEnd")}
                  min="0"
                  max="23"
                  required
                />
              </div>
              <div className={styles.scheduleDays}>
                <label></label>
                {[
                  "Lundi",
                  "Mardi",
                  "Mercredi",
                  "Jeudi",
                  "Vendredi",
                  "Samedi",
                  "Dimanche",
                ].map((day) => (
                  <span key={day} className={styles.dayBadge}>
                    <input
                      type="checkbox"
                      name={`day${day}`}
                      id={`day${day}${index}`}
                      checked={schedule.day.includes(day)}
                      onChange={(e) => handleDayChange(e, index)}
                    />
                    <label htmlFor={`day${day}${index}`}>{day}</label>
                  </span>
                ))}
              </div>
              <CustomButton
                text="Supprimer le créneau"
                onClick={() => removeSchedule(index)}
              />
            </div>
          ))}
          <CustomButton
            text="Ajouter un nouvel créneau"
            onClick={addNewSchedule}
          />
        </div>
        <div className={styles.buttonContainer}>
          <CustomButton text="Ajouter" type="submit" />
          <CustomButton text="Annuler" variant="cancel" onClick={closeModal} />
        </div>
      </form>
    </div>
  );
};

export default AddElectrovalveForm;
