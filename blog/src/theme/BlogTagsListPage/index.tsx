import React from "react";
import clsx from "clsx";
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames, translateTagsPageTitle } from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import TagsListByLetter from "@theme/TagsListByLetter";
import SearchMetadata from "@theme/SearchMetadata";
import { GENERIC_TITLE } from "@site/src/constants";
export default function BlogTagsListPage({ tags }) {
  const title = translateTagsPageTitle();
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogTagsListPage)}>
      <PageMetadata title={title} />

      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout title={`Blog | Tags | ${GENERIC_TITLE}`}>
        <div className="block__container block__container_centered block__container_margin-top">
          <h1>{title}</h1>
        </div>
        <div className="block__container block__container_centered">
          <TagsListByLetter tags={tags} />
        </div>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
