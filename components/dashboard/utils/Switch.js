import { motion } from "framer-motion";
import styles from "@/styles/dashboard/switch.module.scss";
import { useEffect, useState } from "react";
import { updateData } from "@utils/data-fetcher";
export default function Switch({ endPoint, property, bool, id }) {
  const [toggle, setToggle] = useState(false);
  const containerClassName = `${styles.container} ${toggle ? styles.end : ""}`;
  const containerClassNameSchedules = `${styles.containerschedules} ${
    toggle ? styles.end : ""
  }`;

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

  switch (endPoint) {
    case "electrovalves":
      return (
        <div onClick={handleToggle} className={containerClassName}>
          <motion.div className={styles.circle} layout>
            <span className={styles.isAutoText}>
              {toggle ? "auto" : "manuel"}
            </span>
          </motion.div>
        </div>
      );
    case "schedules":
      return (
        <div onClick={handleToggle} className={containerClassNameSchedules}>
          <motion.div className={styles.circleschedules} layout></motion.div>
        </div>
      );
    default:
      return null; // ou return <> </>; si vous préférez
  }

  return null;
}
