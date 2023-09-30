"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/dashboard/page.module.scss";
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import Forecast from "@/components/dashboard/Forecast";
import Settings from "@/components/dashboard/Settings";
import Navigation from "@components/Navigation";
import Sidebar from "@components/dashboard/Sidebar";

export default function Dashboard() {
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
          <Settings />
        </div>
        <div className={styles.higherCard}>
          <Settings />
        </div>
        <div className={styles.mainContainer}>
          <Settings />
        </div>
        <div className={styles.mainContainer}>
          <Settings />
        </div>
      </div>
    </div>
  );
}
