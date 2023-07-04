import styles
    from '@/styles/dashboard/page.module.scss';
import CurrentWeather from "@/components/dashboard/CurrentWeather";
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
        </div>
    )
}