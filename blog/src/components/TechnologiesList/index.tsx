import React from 'react';
import styled from '@emotion/styled';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { BlogApiTechnologies } from '@site/src/types';

interface TechnologiesProps {
  technologies: BlogApiTechnologies;
}

const TechnologiesList = ({ technologies }: TechnologiesProps) => {
  return (
    <section className={styles['sec-techs']}>
      <div className={styles.container}>
        <h2 className={styles['sec-techs__title']}>{technologies.title}</h2>
        <div className={styles.techs}>
          {technologies.technologies.map((tech) => (
            <Link to={tech.link} className={styles.techs__link}>
              <img src={`${tech.picture}?auto=format`} alt={tech.name} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesList;
