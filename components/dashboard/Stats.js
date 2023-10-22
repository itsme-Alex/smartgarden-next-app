import React, { useState } from 'react';
import Graph from '@/components/dashboard/Graph';
import CustomButton from '@/components/dashboard/utils/CustomButton';
import styles from '@/styles/dashboard/stats.module.scss';

const Stats = ({ electrovalves }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openGraphModal = () => {
        setModalIsOpen(true);
    };

    const closeGraphModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <h2>Statistiques</h2>
            <Graph electrovalves={electrovalves} />
            <CustomButton
                text="Afficher en grand"
                onClick={openGraphModal}
                centered
                variant="default"
            />
            {modalIsOpen && (
                <div className={styles.fullScreenModal}>
                    <Graph electrovalves={electrovalves} />
                    <CustomButton
                        text="Fermer"
                        onClick={closeGraphModal}
                        centered
                        variant="default"
                    />
                </div>
            )}
        </>
    );
};

export default Stats;
