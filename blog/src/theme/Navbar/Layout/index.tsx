import React from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useHideableNavbar, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import styles from './styles.module.css';

function NavbarBackdrop(props) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx('navbar-sidebar__backdrop', props.className)}
    />
  );
}
export default function NavbarLayout({ children }) {
  return null;

  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);
  return (
    <nav
      ref={navbarRef}
      className={clsx(
        styles.navbar,
        hideOnScroll && [styles.navbarHideable, !isNavbarVisible && styles.navbarHidden],
        {
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': mobileSidebar.shown,
        },
      )}
    >
      <div className="block__container">
        {children}
        <NavbarBackdrop onClick={mobileSidebar.toggle} />
        <NavbarMobileSidebar />
      </div>
    </nav>
  );
}
