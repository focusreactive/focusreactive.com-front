import React from 'react';
import clsx from 'clsx';
// @ts-ignore
import { useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
// apply a bottom margin in list view
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

type BlogPostItemProps = {
  showTitle: boolean;
  className: string;
  children: JSX.Element;
};
export default function BlogPostItem({ children, className, showTitle }: BlogPostItemProps) {
  const containerClassName = useContainerClassName();
  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
