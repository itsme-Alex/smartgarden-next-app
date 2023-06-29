import styles
    from '@/styles/dashboard/page.module.scss';
export default function Dashboard() {
    return (
        <div
            className={styles.page}>
            <div
                className={styles.pageHeader}>
                <h1>Dashboard</h1>
            </div>
            <div className={styles.mainContainer}>
            </div>
        </div>
    )
}