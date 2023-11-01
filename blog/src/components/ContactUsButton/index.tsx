import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type ContactUsButtonProps = {
  to: string;
  label: string;
};

const ContactUsButton = ({ label, to }: ContactUsButtonProps) => {
  return (
    <Link
      target="_self"
      to={to}
      className={clsx(styles['menu__item-button'], styles['menu__item-button_margin-left'])}
    >
      {label}
    </Link>
  );
};

export default ContactUsButton;
