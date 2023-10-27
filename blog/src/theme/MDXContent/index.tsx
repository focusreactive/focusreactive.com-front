import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';

import Gist from '../../components/Gist';
import { Image } from '../../components/renders/blog-post.components';
import GraphiQL from '@site/src/components/GraphiQL';

const components = {
  ...MDXComponents,
  code: (props) => {
    console.log("🚀 ~ file: index.tsx:12 ~ props:", props)
    if (props?.className?.match(/^language-graphiql.*/)) {
      return <GraphiQL {...props} mdxCode={MDXComponents.code}/>;
    }
    return MDXComponents.code(props)
  },
  pre: (props) => {
    return <>{props.children}</>;
  },
  Gist,
  ImageBlock: Image,
};

export default function MDXContent({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
