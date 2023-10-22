import React, { useState } from 'react';
import styles from '@/styles/dashboard/irrigationsHistory.module.scss';
import CustomButton from '@/components/dashboard/utils/CustomButton';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const formattedDate = date.toLocaleDateString('fr-FR', optionsDate);
    const formattedTime = date.toLocaleTimeString('fr-FR', optionsTime);
    return `${formattedDate} à ${formattedTime}`;
};

const IrrigationsHistory = ({ electrovalves }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openIrrigationDetails = () => {
        setModalIsOpen(true);
    };

    return (
        <div className={styles.historyContainer}>
            <h2>Historique</h2>
            {electrovalves.map((electrovalve, index) => (
                <div key={index} className={styles.electrovalveSection}>
                    <h3 className={styles.electrovalveTitle}>{electrovalve.name}</h3>
                    <table className={styles.irrigationTable}>
                        <thead>
                        <tr>
                            <th>Début</th>
                            <th>Fin</th>
                            <th>Vol.(mm)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {electrovalve.irrigations.slice(0, 2).map((irrigation, i) => (
                            <tr key={i}>
                                <td>{formatDate(irrigation.dateStart)}</td>
                                <td>{formatDate(irrigation.dateEnd)}</td>
                                <td>{irrigation.volume}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
            <CustomButton
                text="Voir plus"
                onClick={openIrrigationDetails}
                centered
                variant="default"
            />

            {/* MODAL */}
            {modalIsOpen && (
                <div className={styles.fullScreenModal}>
                    {electrovalves.map((electrovalve, index) => (
                        <div key={index} className={styles.electrovalveSection}>
                            <h3 className={`${styles.electrovalveTitle} ${styles.specialColor}`}>{electrovalve.name}</h3>
                            <table className={styles.irrigationTable}>
                                <thead>
                                <tr>
                                    <th>Début</th>
                                    <th>Fin</th>
                                    <th>Vol.(mm)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {electrovalve.irrigations.map((irrigation, i) => (
                                    <tr key={i}>
                                        <td>{formatDate(irrigation.dateStart)}</td>
                                        <td>{formatDate(irrigation.dateEnd)}</td>
                                        <td>{irrigation.volume}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                    <CustomButton
                        text="Fermer"
                        onClick={() => setModalIsOpen(false)}
                        centered
                        variant="default"
                    />
                </div>
            )}
        </div>
    );
};

export default IrrigationsHistory;
