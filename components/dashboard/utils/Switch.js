import {motion} from 'framer-motion';
import styles from '@/styles/dashboard/switch.module.scss';
import {useEffect, useState} from "react";
export default function Switch({isAutomatic}) {
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
        console.log(toggle)
    }

    useEffect(() => {
            setToggle(isAutomatic ? true : false);
        }, [isAutomatic]
        , );

    const containerClassName = `${styles.container} ${toggle ? styles.end : ''}`;

    return (
        <div
            onClick={handleToggle}
            className={containerClassName}>
            <motion.div
                className={styles.circle}
                layout
            >
                <span className={styles.isAutoText}>{toggle ? 'auto' : 'manuel'}</span>
            </motion.div>
        </div>
    );
}