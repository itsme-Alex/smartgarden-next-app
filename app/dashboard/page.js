import styles
    from '@/styles/dashboard/page.module.scss';
import CurrentWeather from "@/components/dashboard/CurrentWeather";
import Forecast from "@/components/dashboard/Forecast";
import Settings from "@/components/dashboard/Settings";
export default function Dashboard() {
    return (
        <div
            className={styles.page}>
            <div
                className={styles.pageHeader}>
                <h1>waterpilot</h1>
            </div>
            <div className={styles.mainContainer}>
                <CurrentWeather/>
            </div>
            <div className={styles.mainContainer}>
                <Forecast/>
            </div>
            <div className={styles.mainContainer}>
                <Settings/>
            </div>
            <div className={styles.mainContainer}>
                <IrrigationsHistory/>
            </div>
        </div>
    )
}