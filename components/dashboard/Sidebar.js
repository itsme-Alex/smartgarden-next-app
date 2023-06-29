import React from 'react';
import Link from 'next/link';
import styles from '@/styles/dashboard/sidebar.module.scss';

const Sidebar = () => {
    const sidebarData = [
        {
            name: 'Dashboard',
            path: '/dashboard',
        },
        {
            name: 'Historique',
            path: '/dashboard/history',
        },
        {
            name: 'Planifications',
            path: '/dashboard/schedules',
        },
        {
            name: 'Réglages',
            path: '/dashboard/settings',
        },
    ];
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <Link href="/dashboard">
                    waterpilot
                </Link>
            </div>
            <ul className={styles.navItems}>
                {sidebarData.map((item) => (
                    <li key={item.path}>
                        <Link href={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;