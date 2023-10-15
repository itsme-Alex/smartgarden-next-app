import Switch from "../utils/Switch";
import Styles from "@/styles/dashboard/scheduleForm.module.scss";
import { addData, getElectrovalve } from "@utils/data-fetcher";
import React, { useState } from "react";
import CustomButton from "../utils/CustomButton";
import { useConnected } from "@context/ConnectedContext";

const AddScheduleForm = ({
  valveId,
  settingsId,
  setElectrovalves,
  setDynamicSchedules,
}) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startHour, setStartHour] = useState("00");
  const [endHour, setEndHour] = useState("01");
  const { updateConnection } = useConnected();

  console.log("valveId", valveId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const days = convertDaysToString(selectedDays);
    const data = {
      hourStart: Number(e.target.startHour.value),
      hourEnd: Number(e.target.endHour.value),
      days: days,
      isActivated: true,
      valveSettings: settingsId,
    };
    console.log(data);

    try {
      await addData("schedules", data);
      cancelFunction(valveId);
      const dataValve = await getElectrovalve();
      const transformedData = dataValve["hydra:member"].map((electrovalve) => ({
        ...electrovalve,
        id: electrovalve["@id"].split("/").pop(),
      }));
      setElectrovalves(transformedData);
    } catch (error) {
      console.log("error", error);
      if (error === 401) updateConnection(false);
    }
  };

  const convertDaysToString = (days) => {
    const daysString = days.map((day) => {
      switch (day) {
        case 0:
          return "Lundi";
        case 1:
          return "Mardi";
        case 2:
          return "Mercredi";
        case 3:
          return "Jeudi";
        case 4:
          return "Vendredi";
        case 5:
          return "Samedi";
        case 6:
          return "Dimanche";
        default:
          return null;
      }
    });
    return daysString;
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays((prevDays) => prevDays.filter((d) => d !== day));
    } else {
      setSelectedDays((prevDays) => [...prevDays, day]);
    }
  };
  const cancelFunction = (id) => {
    setDynamicSchedules((prevSchedules) => {
      return prevSchedules.filter((schedule) => schedule !== id);
    });
  };

  return (
    <div className={Styles.container}>
      <button
        onClick={() => cancelFunction(valveId)}
        className={Styles.buttonCancel}
        type="cancel"
      >
        X
      </button>
      <form onSubmit={handleSubmit} className={Styles.formContainer}>
        <div className={Styles.flexContainer}>
          <div className={Styles.inputHour}>
            <label htmlFor="startHour">début:</label>
            <select
              name="startHour"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            >
              {Array.from({ length: 24 }).map((_, index) => {
                const hour = String(index).padStart(2, "0");
                return (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={Styles.inputHour}>
            <label htmlFor="endHour">fin:</label>
            <select
              name="endHour"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            >
              {Array.from({ length: 24 }).map((_, index) => {
                const hour = String(index).padStart(2, "0");
                if (hour <= startHour) return null;
                return (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={Styles.inputHour}>
            <label htmlFor="days">Jours:</label>
            <div id="days">
              {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                <span
                  key={index}
                  onClick={() => toggleDay(index)}
                  style={{
                    color: selectedDays.includes(index) ? "red" : "black",
                    cursor: "pointer",
                    margin: "0 2px",
                  }}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>
        <CustomButton text="Enregistrer" variant="default" type="submit" />
        {/* <button className={Styles.button} type="submit">
          Enregistrer
        </button> */}
      </form>
    </div>
  );
};

export default AddScheduleForm;
