'use client'

import React, { use } from 'react';
import styles from '@/styles/dashboard/currentWeather.module.scss';

const API_KEY = "9727c2c6aae9af369bc61a39edbcdbac";
const latitude = "45.750000";
const longitude = "4.850000";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=FR`;

const getCurrentWeather = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

const weatherData = getCurrentWeather();

export default function CurrentWeather() {

    const weather = use(weatherData);

    return (
        <>
            <div
                className={styles.container}
                style={{backgroundImage: `url(http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png)`,
                    width: '100%',
                    height: '300px',
                    backgroundSize: 'cover'}}>
                <p className={styles.temp}>{weather.main.temp} °C</p>
                <p className={styles.cityName}>{weather.name}</p>
            </div>
        </>
    );
};