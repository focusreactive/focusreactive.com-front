import React from 'react';
import Author from '../Author';
import styles from './styles.module.css';
import BlogPostItemHeaderInfo from '@site/src/theme/BlogPostItem/Header/Info';
import getAuthors from '@site/utils/getAuthors';

type SocialsProps = {
  authors: [];
  authorsMap: [];
};
const AUTHORS_VISIBLE = 3;
const Socials = ({ authors, authorsMap }: SocialsProps) => {
  const postAuthors = getAuthors(authorsMap, authors);

  return (
    <div className={styles['article-info']}>
      <div className={styles['article-info__socials']}>
        <BlogPostItemHeaderInfo />
      </div>
      {postAuthors.length < AUTHORS_VISIBLE && (
        <div className={styles['article-info__authors']}>
          {postAuthors.map((author) => (
            <Author {...author} key={author.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Socials;
