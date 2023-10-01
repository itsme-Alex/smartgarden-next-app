import {motion} from 'framer-motion';
import styles from '@/styles/dashboard/switch.module.scss';
import {useEffect, useState} from "react";
import {
    updateValve
} from "@utils/data-fetcher";
export default function Switch({isAutomatic, id}) {
    const [toggle, setToggle] = useState(false);
    const containerClassName = `${styles.container} ${toggle ? styles.end : ''}`;

    useEffect(() => {
            setToggle(isAutomatic ? true : false);
        }, [isAutomatic]
        , );
    const handleToggle = async () => {
        try {
            setToggle(!toggle);
            await updateValve(id, {
                isAutomatic: !toggle,
            });
        } catch (error) {
            console.log(error);
        }
    }

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