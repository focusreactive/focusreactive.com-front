import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export default function FooterCopyright({ copyright }) {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  const { contactInfo } = customFields;

  return (
    <div className={styles["footer__bottom-container"]}>
      <div
        className={clsx("footer__copyright", styles["footer-copyright"])}
        // Developer provided the HTML, so assume it's safe.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: copyright }}
      />
      <div
        className="footer__copyright"
        // Developer provided the HTML, so assume it's safe.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: contactInfo as string }}
      />
    </div>
  );
}
