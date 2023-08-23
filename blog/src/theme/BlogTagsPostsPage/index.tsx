import React from "react";
import clsx from "clsx";
import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames, usePluralForm } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import { ArticlesList } from "../../components/ArticlesList";
import styles from "./styles.module.css";
import { GENERIC_TITLE } from "@site/src/constants";

// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const { selectMessage } = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          id: "theme.blog.post.plurals",
          description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One post|{count} posts",
        },
        { count }
      )
    );
}
function useBlogTagsPostsPageTitle(tag) {
  const blogPostsPlural = useBlogPostsPlural();
  return translate(
    {
      id: "theme.blog.tagTitle",
      description: "The title of the page for a blog tag",
      message: '{nPosts} tagged with "{tagName}"',
    },
    { nPosts: blogPostsPlural(tag.count), tagName: tag.label }
  );
}
function BlogTagsPostsPageMetadata({ tag }) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}
function BlogTagsPostsPageContent({ tag, items }) {
  const title = useBlogTagsPostsPageTitle(tag);
  const posts = items.map((item) => ({
    tags: item.content.frontMatter.tags,
    title: item.content.frontMatter.title,
    permalink: item.content.frontMatter.slug,
    description: item.content.frontMatter.description,
  }));
  return (
    <BlogLayout title={`${title} | ${GENERIC_TITLE}`}>
      <div className={clsx("block__container", "block__container_centered", "block__container_margin-top")}>
        <header className="margin-bottom--xl">
          <h1>{title}</h1>

          <Link href={tag.allTagsPath}>
            <Translate id="theme.tags.tagsPageLink" description="The label of the link targeting the tag list page">
              View All Tags
            </Translate>
          </Link>
        </header>
      </div>

      <ArticlesList posts={posts} />
    </BlogLayout>
  );
}
export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogTagPostListPage)}
    >
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
