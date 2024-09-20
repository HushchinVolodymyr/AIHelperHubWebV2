import React from 'react';
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <h1 className={styles.footerText}>Some useful maybe information</h1>
    </footer>
  );
};

export default Footer;