import React, { useState, useEffect } from "react";
import styles from "@/styles/dashboard/forecast.module.scss";
import Image from "next/image";

const API_KEY = "9727c2c6aae9af369bc61a39edbcdbac";
const latitude = "45.750000";
const longitude = "4.850000";
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=FR`;

export default function ForeCasts() {
  // Utilisez une majuscule pour les noms de composants
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getForecasts = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setForecast(data);
    };

    getForecasts();
  }, []);

  const filteredForecast =
    forecast &&
    forecast.list.length > 0 &&
    forecast.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5);

  filteredForecast?.length > 0 &&
    filteredForecast.forEach((item) => {
      const date = new Date(item.dt_txt);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
      item.dt_txt = `${day}-${month}`;
      item.main.temp = Math.round(item.main.temp);
    });
  return (
    <div className={styles.container}>
      <h2>Prévision sur 5 jours</h2>
      <div className={styles.forecastContainer}>
        {filteredForecast &&
          filteredForecast.map((item, index) => (
            <div key={index} className={styles.forecast}>
              <p className={styles.date}>{item.dt_txt}</p>
              <Image
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                alt="weather icon"
                width={60}
                height={60}
                priority={true}
                className={styles.forecastIcon}
              />
              <p className={styles.temp}>{item.main.temp}°C</p>
            </div>
          ))}
      </div>
    </div>
  );
}
