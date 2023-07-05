import Sidebar from "@/components/dashboard/Sidebar";
import styles from "@/styles/dashboard/layout.scss";
export default function DashboardLayout({ children }) {
    return (
        <div className={styles.dashboardLayout}>
            <Sidebar/>
            {children}
        </div>
    );
}