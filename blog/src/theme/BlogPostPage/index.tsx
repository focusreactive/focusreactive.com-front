import React from "react";
import {
  BlogPostProvider,
  useBlogPost, // @ts-ignore
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostItem from "@theme/BlogPostItem";
import Socials from "../../components/Socials";
import { Article, MarkdownBlock } from "../../components/renders/blog-post.styles";
import Signatures from "../../components/Signatures";
import { ArticlesList } from "../../components/ArticlesList";
import styles from "./styles.module.css";
import { TagsRow } from "../../components/TagsRow";
import type { SanityApiAuthor, BlogApiRelatedPost } from "@site/src/types";
import clsx from "clsx";
import MDXContent from "../MDXContent";
import Head from "@docusaurus/Head";
import { GENERIC_TITLE } from "@site/src/constants";

function BlogPostPageContent({ children }) {
  const { frontMatter } = useBlogPost();

  type ExtendedMetadata = typeof frontMatter & {
    relatedPosts: BlogApiRelatedPost;
    authorsMap: SanityApiAuthor[];
  };

  const { title, description, tags, relatedPosts, permalink, authorsMap, date } =
    frontMatter as unknown as ExtendedMetadata;

  const heroImage = (frontMatter.image || frontMatter.heroImage) as string;
  const authorIds = frontMatter.authors || [];
  const keywords = tags.map((tag) => tag.label).join(", ");
  const authors = authorsMap
    .filter((author) => authorIds.includes(author.id))
    .map((author) => author.name)
    .join(", ");

  return (
    <BlogLayout title={title} description={description} keywords={keywords} image={heroImage} type={"article"}>
      <Head>
        <meta property={"article:published_time"} content={date.toISOString()} />
        <meta property={"article:modified_time"} content={date.toISOString()} />
        <meta property={"article:author"} content={authors} />
        <meta property={"article:tag"} content={keywords} />
      </Head>
      <Article className={styles.article}>
        <MarkdownBlock className={styles.article__container} heroImage={heroImage}>
          <h1 className={styles.article__title}>{title}</h1>
          <p className={styles.article__description}>{description}</p>
        </MarkdownBlock>
        <Socials authors={authorIds} authorsMap={authorsMap} />
        <MarkdownBlock className={styles.article__container} heroImage={heroImage}>
          {heroImage ? <img className="hero-image" src={`${heroImage}?w=1920&auto=format`} alt={title} fetchPriority="hight" /> : null}
          <MDXContent>{children}</MDXContent>
        </MarkdownBlock>
        <div className={styles.article__tags}>
          <TagsRow tags={tags} noLinks={false} />
        </div>
      </Article>
      <Signatures authorsMap={authorsMap} authorIds={authorIds} />
      <ArticlesList posts={relatedPosts} excludeLinks={permalink} short />
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;

  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <BlogPostPageContent>
        <BlogPostContent />
      </BlogPostPageContent>
    </BlogPostProvider>
  );
}
