'use client';
import { useState,useEffect } from "react";
import styles from "@/styles/dashboard/page.module.scss";
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import Forecast from "@/components/dashboard/Forecast";
import Settings from "@/components/dashboard/Settings";
import Cookies from 'js-cookie';

export default function Dashboard() {
//   const [electrovalves, setElectrovalves] = useState(null);

/*  useEffect(() => {
    async function fetchData() {

      try {
        const response = await fetch(
            "/api/electrovalves",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response}`);
        }
        const data = await response.json();
        console.log(data);
        // setElectrovalves(data);
      } catch (error) {
        console.error("Fetching data failed", error);
      }
    }

    fetchData();
  }, []);*/
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1>waterpilot</h1>
      </div>
      <div className={styles.mainContainer}>
                <CurrentWeather/>
            </div>
            <div className={styles.mainContainer}>
                <Forecast/>
            </div>
            <div className={styles.mainContainer}>
                <Settings/>
            </div>
{/*            <div className={styles.mainContainer}>
                <IrrigationsHistory/>
            </div>*/}
        </div>
    )
}