"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/dashboard/page.module.scss";
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import Forecast from "@/components/dashboard/Forecast";
import Settings from "@/components/dashboard/Settings";
import Navigation from "@components/Navigation";
import Sidebar from "@components/dashboard/Sidebar";
import { useConnected } from "@context/ConnectedContext";
import { useRouter } from "next/navigation";
import Schedule from "@components/dashboard/Schedules";
import Schedules from "@components/dashboard/Schedules";
import IrrigationsHistory from "@components/dashboard/IrrigationsHistory";
import Stats from "@components/dashboard/Stats";

export default function Dashboard() {
  const [electrovalves, setElectrovalves] = useState([]);
  const { state, checkConnection, updateConnection } = useConnected();
  const router = useRouter();

  useEffect(() => {
    console.log("electrovalves", electrovalves);
  }, [electrovalves]);

  useEffect(() => {
    if (!state.isConnected) router.push("/login");
    //eslint-disable-next-line
  }, [state.isConnected]);

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

  return (
    <div className={styles.page}>
      <Navigation />
      <Sidebar />
      <div className={styles.cards}>
        <div className={styles.mainContainer}>
          <CurrentWeather />
        </div>
        <div className={styles.mainContainer}>
          <Forecast />
        </div>
        <div className={styles.higherCard}>
          {electrovalves && (
            <Settings
              electrovalves={electrovalves}
              setElectrovalves={setElectrovalves}
            />
          )}
        </div>
        <div className={styles.higherCard}>
          {electrovalves && (
            <Schedules
              electrovalves={electrovalves}
              setElectrovalves={setElectrovalves}
            />
          )}
        </div>
        <div className={styles.mainContainer}>
          {electrovalves && (
              <IrrigationsHistory electrovalves={electrovalves} />
          )}
        </div>
        <div className={styles.mainContainer}>
          {electrovalves && (
              <Stats electrovalves={electrovalves} />
          )}
        </div>
      </div>
    </div>
  );
}
