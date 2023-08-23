import React from "react";
import styled from "@emotion/styled";
import Link from "@docusaurus/Link";
import type { BlogApiTag } from "@site/src/types";

type TagProp = {
  isLink: boolean;
};

export const Tag = styled.span<TagProp>`
  margin-right: 9px;
  color: #13cf2e;
  :last-of-type {
    margin-right: 0;
  }
  a {
    text-decoration: none;
  }
  ${({ isLink }) =>
    isLink
      ? `
  :hover {
    text-decoration: underline;
  }
  `
      : ""}
`;

interface TagsRowProps {
  tags: BlogApiTag[];
  noLinks: boolean;
}

export const TagsRow = ({ tags, noLinks }: TagsRowProps) => {
  return (
    <>
      {tags.map((tag) => {
        const hashtag = `#${tag.label}`;

        if (noLinks)
          return (
            <Tag key={hashtag} isLink={false}>
              {hashtag}
            </Tag>
          );

        return (
          <Tag key={hashtag} isLink={true}>
            <Link to={tag.permalink}>{hashtag}</Link>
          </Tag>
        );
      })}
    </>
  );
};
