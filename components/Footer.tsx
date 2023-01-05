import * as React from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Footer = () => { 
    return(
      <div className='bg-slate-300'>
        <footer className={styles.footer}>
        <a
          href="https://github.com/joaovwfreire"
          target="_blank"
          rel="noopener noreferrer"
          
        >Made with love by JoVi
        </a>
      </footer>
      </div>
    )}    


export default Footer;