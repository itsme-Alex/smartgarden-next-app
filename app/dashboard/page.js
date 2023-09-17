'use client';
import { useState,useEffect } from "react";
import styles from "@/styles/dashboard/page.module.scss";
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import Forecast from "@/components/dashboard/Forecast";
import Settings from "@/components/dashboard/Settings";
import Navigation from "@components/Navigation";

export default function Dashboard() {
const [electrovalves, setElectrovalves] = useState(null);

  useEffect(() => {
    async function fetchData() {
      
      try {

        console.log("cookie", document.cookie);
        let token = document.cookie.split("=")[1];

        const apiRes = await fetch("http://127.0.0.1:8080/api/electrovalves", {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "GET",
        });

        if (!apiRes.ok) {
          console.log(apiRes);
          throw new Error(`HTTP error! status: ${apiRes}`);
        }

        const data = await apiRes.json();
        apiRes.status(200).json(data);
      } catch (error) {
        apiRes.status(500).json({ message: error.message });
      }
    }

      fetchData();
    }
  }, []);
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
