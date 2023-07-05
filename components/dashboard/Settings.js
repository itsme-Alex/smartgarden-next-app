'use client'

import React, {
    use,
} from 'react';
import styles from '@/styles/dashboard/settings.module.scss';
import {faSliders} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faFaucetDrip} from '@fortawesome/free-solid-svg-icons';
import {motion} from "framer-motion";

import SettingsButton from '@/components/dashboard/utils/SettingsButton';
import Switch from '@/components/dashboard/utils/Switch';

const API_URL = `http://162.19.92.61:3002/electrovalve`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MzcyOTcwLCJleHAiOjE2ODkyMzY5NzB9.1VXX8bQfE5DqR5MyS3kIo3sBVesGkqmMm673-ZwNpNk";

const getElectrovalve = async () => {
    try {
        const res = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token
            }
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

const electrovalveData = getElectrovalve();

export default function Settings() {
    const electrovalves = use(electrovalveData);
    const handleModal = (electrovalveId) => {
console.log("handleModal")
    }
    const  handleWater = () => { console.log("Activation de l'arrosage...");}

    return (
        <div>
            <p>Paramétrages</p>
            {electrovalves.map((electrovalve) => (
                <div key={electrovalve.id} className={styles.valveContainer}>
                    <div>
                        <p>Circuit {electrovalve.position } : {electrovalve.name}</p>
                    </div>
                    <div className={styles.buttonPanel}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <SettingsButton icon={faSliders} onClick={()=> handleModal(electrovalve.id)}/>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <SettingsButton destination="schedules" icon={faClock} />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <SettingsButton icon={faFaucetDrip} onClick={handleWater} />
                        </motion.div>
                        <Switch isAutomatic={electrovalve.isAutomatic}/>
                    </div>
                </div>
            ))}
        </div>
    );
}
