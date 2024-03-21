import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <footer>
        <p>&copy; Svana Björg Birgisdóttir {new Date().getFullYear()}</p>
      </footer>
    </footer>
  );
}

