import { motion } from "framer-motion";
import styles from "@/styles/dashboard/switch.module.scss";
import { useEffect, useState } from "react";
import { updateData } from "@utils/data-fetcher";
export default function Switch({ endPoint, property, bool, id }) {
  const [toggle, setToggle] = useState(false);
  const containerClassName = `${styles.container} ${toggle ? styles.end : ""}`;

  useEffect(() => {
    setToggle(bool ? true : false);
  }, [bool]);
  const handleToggle = async () => {
    try {
      const resp = await updateData(endPoint, id, {
        [property]: !toggle,
      });
      setToggle(!toggle);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={handleToggle} className={containerClassName}>
      <motion.div className={styles.circle} layout>
        <span className={styles.isAutoText}>{toggle ? "auto" : "manuel"}</span>
      </motion.div>
    </div>
  );
}
