import styles from "@/styles/dashboard/layout.module.scss";
export default function DashboardLayout({ children }) {
  return <div className={styles.dashboardLayout}>{children}</div>;
}
