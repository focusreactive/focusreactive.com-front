import React from 'react';
import styled from '@emotion/styled';
import { TagsRow } from '../TagsRow';
import { BlogApiTag } from '@site/src/types';
import styles from './styles.module.css';

const TagsHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  text-transform: uppercase;
  font-weight: bold;
  padding: 32px var(--layout-horizonal-padding);
`;

type TagsListProps = {
  tags: BlogApiTag[];
};

const TagsList = ({ tags }: TagsListProps) => {
  return (
    <section className={styles['tag-section']} id="tag-section" data-section="tag-section">
      <TagsHolder className="block__container">
        <TagsRow tags={tags} noLinks={false} />
      </TagsHolder>
    </section>
  );
};

export default TagsList;
