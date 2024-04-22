import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { GENERIC_DESCRIPTION } from '@site/src/constants';
import { PageMetadata } from '@docusaurus/theme-common';
import { usePreview } from '@site/src/hooks/usePreview';
import { generateOptimizedSources } from '@site/utils/imageOptimizations';

export default function BlogLayout(props) {
  const { children, title, description, keywords, image, type, ...layoutProps } = props;

  const previewImage = image
    ? `${image}?w=1200&h=630`
    : 'https://focusreactive.com/assets/img/og-image.png';

  usePreview();

  const { optimizedSrc, optimizedSrcSet } = generateOptimizedSources(image, { width: 'full' });

  return (
    <Layout {...layoutProps}>
      <PageMetadata title={title} />

      <Head>
        <meta name="description" content={description || GENERIC_DESCRIPTION} />
        <meta name="og:description" content={description || GENERIC_DESCRIPTION} />

        <meta name="og:image" content={previewImage} />
        {image && (
          <link
            href={optimizedSrc}
            rel="preload"
            as="image"
            fetchPriority="high"
            imageSrcSet={optimizedSrcSet}
          />
        )}

        {keywords && <meta name="keywords" content={keywords} />}

        <meta name="og:type" content={type || 'website'} />

        <meta name="twitter:site" content="@FocusReactive" />
      </Head>

      <main itemScope itemType="http://schema.org/Blog">
        {children}
      </main>
    </Layout>
  );
}
