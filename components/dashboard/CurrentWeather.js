import React, { useState, useEffect } from "react";
import styles from "@/styles/dashboard/currentWeather.module.scss";
import Image from "next/image";

const API_KEY = "9727c2c6aae9af369bc61a39edbcdbac";
const latitude = "45.750000";
const longitude = "4.850000";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=FR`;

export default function CurrentWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getCurrentWeather = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setWeather(data);
    };

    getCurrentWeather();
  }, []);
  useEffect(() => {
    //console.log(weather);
  }, [weather]);

  if (!weather) return <div>Loading...</div>; // Afficher un indicateur de chargement tant que les données ne sont pas chargées

  return (
    <div className={styles.container}>
      <p className={styles.temp}>{Math.round(weather.main.temp)} °C</p>
      <p className={styles.cityName}>{weather.name}</p>
      <Image
        className={styles.icone}
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt="weather icon"
        width={200}
        height={200}
        priority={true}
      />
      <div className={styles.humidity}>
        <Image
          src={`/images/icones/icons8-humidity-32.png`}
          alt="humidity icon"
          width={30}
          height={30}
        />
        <p>Humidité du sol</p>
        <p>25%</p>
      </div>
    </div>
  );
}
