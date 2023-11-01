import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function FooterLayout({ style, links, logo, copyright }) {
  return (
    <footer
      className={clsx('footer', styles.footer, {
        'footer--dark': style === 'dark',
      })}
    >
      <div className={clsx('block__container container-fluid', styles.footer__container)}>
        {links}
      </div>

      {(logo || copyright) && (
        <div className="footer__bottom text--center">
          {logo && <div className="margin-bottom--sm">{logo}</div>}
          {copyright}
        </div>
      )}
    </footer>
  );
}
