// CustomButton.js

import React from 'react';
import styles from '@/styles/common/CustomButton.module.scss'; // Si vous utilisez SCSS modules

const CustomButton = ({ text, onClick, centered, variant, ...props }) => {
    return (
        <button className={`${styles.customButton} ${centered ? styles.centered : ''} ${styles[variant]}`} onClick={onClick} {...props}>
            {text}
        </button>
    );
};

export default CustomButton;
