'use client'

import React, {use, useState} from 'react';
import styles from '@/styles/dashboard/settings.module.scss';
import {faSliders} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faFaucetDrip} from '@fortawesome/free-solid-svg-icons';
import {AnimatePresence, motion} from "framer-motion";

import SettingsButton from '@/components/dashboard/utils/SettingsButton';
import Switch from '@/components/dashboard/utils/Switch';
import SettingsSlider from '@/components/dashboard/utils/SettingsSlider';

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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedElectrovalve, setSelectedElectrovalve] = useState(null);
    const handleModal = (electrovalveId, electrovalveName) => {
        setModalIsOpen(!modalIsOpen);
        setSelectedElectrovalve({"name": electrovalveName, "id": electrovalveId});
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
                            <SettingsButton icon={faSliders} onClick={()=> handleModal(electrovalve.id, electrovalve.name)}/>
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
            <AnimatePresence>
                {modalIsOpen && (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}>
                        <div className={styles.modalContent}>
                            <SettingsSlider valve={selectedElectrovalve}/>
                            <button onClick={() => setModalIsOpen(false)}>Fermer</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
