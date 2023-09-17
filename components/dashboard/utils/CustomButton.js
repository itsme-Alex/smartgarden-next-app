// CustomButton.js

import React from 'react';
import styles from '@/styles/common/CustomButton.module.scss'; // Si vous utilisez SCSS modules

const CustomButton = ({ text, onClick, ...props }) => {
    return (
        <button className={styles.customButton} onClick={onClick} {...props}>
            {text}
        </button>
    );
};

export default CustomButton;
