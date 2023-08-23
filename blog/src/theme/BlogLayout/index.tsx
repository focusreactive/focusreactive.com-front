import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

export default function BlogLayout(props) {
  const { children, title, ...layoutProps } = props;

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <main itemScope itemType="http://schema.org/Blog">
        {children}
      </main>
    </Layout>
  );
}
