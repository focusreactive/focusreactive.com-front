import React from "react";
import BlogLayout from "@theme/BlogLayout";
import { ArticlesList } from "../ArticlesList";
import { GENERIC_TITLE } from "@site/src/constants";

const AuthorPage = (props) => {
  const { items } = props;

  const posts = items.map((item) => ({
    tags: item.content.frontMatter.tags,
    title: item.content.frontMatter.title,
    permalink: item.content.frontMatter.slug,
    description: item.content.frontMatter.description,
  }));
  const keywords = [...new Set(posts.flatMap((post) => post.tags.map((tag) => tag.label)))].join(", ");

  return (
    <>
      <BlogLayout title={`Author: ${props.route.authorName}`} keywords={keywords}>
        <div className="block__container_margin-top">
          <ArticlesList posts={posts} />
        </div>
      </BlogLayout>
    </>
  );
};

export default AuthorPage;
