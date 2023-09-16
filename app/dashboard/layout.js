import Sidebar from "@/components/dashboard/Sidebar";
import styles from "@/styles/dashboard/layout.scss";
import Navigation from "@components/Navigation";
export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardLayout}>
      <Navigation />
      <Sidebar />
      {children}
    </div>
  );
}
