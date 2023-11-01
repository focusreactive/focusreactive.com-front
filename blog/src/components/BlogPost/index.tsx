// TODO: if we don't use this file let's consider deleting it
import React from 'react';
import {
  BlogPostProvider,
  useBlogPost, // @ts-ignore
} from '@docusaurus/theme-common/internal';
import { ArticlesList } from '../ArticlesList';
import { MDXProvider } from '@mdx-js/react';
import { Article, MarkdownBlock } from '../renders/blog-post.styles';
import Signatures from '../Signatures';
import Socials from '../Socials';
import { TagsRow } from '../TagsRow';
import Gist from '../../components/Gist';
import { Image } from '../../components/renders/blog-post.components';
import styles from './styles.module.css';
import MDXContent from '@site/src/theme/MDXContent';
import BlogLayout from '@site/src/theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';

const components = {
  Gist,
  ImageBlock: Image,
};

const BlogPost = ({ children }) => {
  const { metadata } = useBlogPost();

  const { title, description, tags, frontMatter, relatedPosts, permalink, authorsMap, content } =
    metadata;
  const heroImage = (frontMatter.image || frontMatter.heroImage) as string;
  const authorIds = frontMatter.authorIds || [];

  return (
    <BlogLayout>
      <Article className={styles.article}>
        <MarkdownBlock className={styles.article__container} heroImage={heroImage}>
          <h1 className={styles.article__title}>{title}</h1>
          <p className={styles.article__description}>{description}</p>
        </MarkdownBlock>
        <Socials authors={authorIds} authorsMap={authorsMap} />
        <MarkdownBlock className={styles.article__container} heroImage={heroImage}>
          {heroImage ? (
            <img className="hero-image" src={`${heroImage}?w=1920&auto=format`} alt={title} />
          ) : null}
        </MarkdownBlock>
        <BlogPostItem>{children}</BlogPostItem>
        <div className={styles.article__tags}>
          <TagsRow tags={tags} noLinks={false} />
        </div>
      </Article>
      <Signatures authorsMap={authorsMap} authorIds={authorIds} />
      <ArticlesList posts={relatedPosts} excludeLinks={permalink} short />
    </BlogLayout>
  );
};

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;

  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <BlogPost>
        <BlogPostContent />
      </BlogPost>
    </BlogPostProvider>
  );
}
