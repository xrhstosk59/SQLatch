import Link from "next/link";

import styles from '../styles/navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link className={styles.navlink} href='/'>Αρχείο</Link>
            <Link className={styles.navlink} href='/'>Ρυθμίσεις</Link>
            <Link className={styles.navlink} href='/'>Κοινοποίηση</Link>
        </div>
    )
}