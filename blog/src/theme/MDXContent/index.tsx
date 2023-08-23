import React from "react";
import { MDXProvider } from "@mdx-js/react";
import MDXComponents from "@theme/MDXComponents";

import Gist from "../../components/Gist";
import { Image } from "../../components/renders/blog-post.components";

const components = {
  ...MDXComponents,
  Gist,
  ImageBlock: Image,
};

export default function MDXContent({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
