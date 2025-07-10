'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { poppins } from "../fonts";
import styles from '../css/navbar.module.css'

export default function Navbar() {
    const pathname = usePathname()
    return (
        <nav className={`${poppins.className} ${styles.navbar}`}>
            <Link href="/" className={styles.logo}>
                WhatToEat
            </Link>
            <div className={styles.navLinks}>
                <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
                    Home
                </Link>

                <Link href="/find" className={`${styles.navLink} ${pathname === '/find' ? styles.active: ''} `}>
                    Find My Meal
                </Link>

            </div>
        </nav>
    );
}

