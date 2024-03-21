import React from 'react';
import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <Link href='/'>Home</Link>
        <Link href='/games'>Games</Link>
      </div>
    </div>
  );
}

