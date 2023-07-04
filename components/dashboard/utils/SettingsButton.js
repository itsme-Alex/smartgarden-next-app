import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@/styles/dashboard/settingsButton.module.scss';
import {motion} from "framer-motion";


export default function SettingsButton({ destination, icon, onClick }) {

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.container}
            onClick={onClick}
        >
            <a href={destination}>
                <FontAwesomeIcon icon={icon} />
            </a>
        </motion.button>
    );
}