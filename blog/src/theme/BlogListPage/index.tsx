import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import { ArticlesList } from '../../components/ArticlesList';
import TagsList from '../../components/TagsList';
import { GENERIC_TITLE } from '@site/src/constants';

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}
function BlogListPageContent(props) {
  const { items, tags } = props;

  const posts = items.map((item) => ({
    permalink: item.content.frontMatter.slug,
    description: item.content.frontMatter.description,
    title: item.content.frontMatter.title,
    tags: item.content.frontMatter.tags,
  }));
  const keywords = tags.map((tag) => tag.label).join(', ');

  return (
    <BlogLayout title={'Blog'} keywords={keywords}>
      <TagsList tags={tags} />
      <ArticlesList posts={posts} />
    </BlogLayout>
  );
}
export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
