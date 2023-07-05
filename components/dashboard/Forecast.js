'use client'

import React, { use } from 'react';
import styles from '@/styles/dashboard/forecast.module.scss';

const API_KEY = "9727c2c6aae9af369bc61a39edbcdbac";
const latitude = "45.750000";
const longitude = "4.850000";
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=FR`;
console.log(API_URL)
const getForecasts = async () => {
    const res = await fetch(API_URL);
    return res.json();
};
const forecastData = getForecasts();

export default function foreCasts() {
    const forecast = use(forecastData);
    const filteredForecast = forecast && forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
    console.log(filteredForecast)

    return (
        <>
            <div className={styles.container}>
                {filteredForecast && filteredForecast.map((item, index) => (
                    <div key={index} className={styles.forecast}>
                        <p className={styles.date}>{item.dt_txt}</p>
                        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`} alt="weather icon" className={styles.forecastIcon} />
                        <p className={styles.temp}>{item.main.temp}°C</p>
                    </div>
                ))}
            </div>
        </>
    )
}