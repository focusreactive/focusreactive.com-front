import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type MailToUsProps = {};

const MailToUs = ({}: MailToUsProps) => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  const { mailToUsTitle } = customFields;
  return (
    <section className={clsx('block__container', styles['mail-us'])} id="mail-us">
      <div className="block__container">
        <h3 className={styles['mail-us__title']}>{mailToUsTitle as string}</h3>

        <form id="mail-us-form" className={styles['mail-form']}>
          <div>
            Reach us by email
            <a href="mailto:hi@focusreactive.com"> hi@focusreactive.com</a> or fill the form below.
          </div>
          <div className={styles['mail-form__line']}>
            <input
              className={styles['mail-form__input']}
              type="email"
              placeholder="Email"
              data-key="visitor-email"
            />
          </div>

          <div className={styles['mail-form__line']}>
            <input
              className={styles['mail-form__input']}
              type="text"
              placeholder="Name"
              data-key="visitor-name"
            />
          </div>

          <div className={styles['mail-form__line']}>
            <textarea
              className={clsx(styles['mail-form__input'], styles['mail-form__input-textarea'])}
              placeholder="Message"
              data-key="visitor-message"
            ></textarea>
          </div>

          <button className={styles['mail-form__submit']} type="submit" disabled>
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default MailToUs;
