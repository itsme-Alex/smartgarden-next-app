import React, { useState } from 'react';
import styles from '@/styles/dashboard/settingsSlider.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4MzcyOTcwLCJleHAiOjE2ODkyMzY5NzB9.1VXX8bQfE5DqR5MyS3kIo3sBVesGkqmMm673-ZwNpNk";


export default function SettingsSlider({ valve }) {
    const [sliderValue, setSliderValue] = useState(0);
    const [inputValue, setInputValue] = useState(0);

    const handleSliderChange = (value) => {
        setSliderValue(value);
        setInputValue(value);
        console.log(value);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setSliderValue(value);
        console.log(value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>Paramétrage pour : {valve.name}</p>
            </div>
            <div>
                <div className={styles.label}>
                    <p>Durée d'arrosage</p>
                </div>
                <div className={styles.sliderContainer}>
                    <div className={styles.slider}>
                        <Slider min={0} max={100} defaultValue={0} value={sliderValue} onChange={handleSliderChange} />
                        <input type="number" value={inputValue} onChange={handleInputChange} className={styles.inputValue}/>
                        <p>min</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
