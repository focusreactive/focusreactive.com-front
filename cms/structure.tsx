import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import {
  ComponentView,
  DefaultDocumentNodeResolver,
  UserViewComponent,
} from 'sanity/lib/exports/desk';
import { SanityDocument } from '@sanity/types';

const sendPostMessage = () => {
  const iframe = document.getElementById(
    'preview_iframe',
  ) as HTMLIFrameElement | null;

  if (!iframe || !iframe.contentWindow) return null;

  iframe.contentWindow.postMessage(
    'reload()',
    'https://fr-11ty-migration-front.vercel.app',
  );
};

const JsonPreview = ({
  document: sanityDocument,
}: {
  document: {
    draft: SanityDocument | null;
    displayed: Partial<SanityDocument>;
    historical: Partial<SanityDocument> | null;
    published: SanityDocument | null;
  };
}) => {
  const [slugString, setSlugString] = useState('');

  const debouncedChangeHandler = useCallback(
    debounce(sendPostMessage, 1000),
    [],
  );

  useEffect(() => {
    if (debouncedChangeHandler) {
      debouncedChangeHandler();
    }
  }, [sanityDocument?.displayed?._updatedAt, debouncedChangeHandler]);

  useEffect(() => {
    switch (sanityDocument?.displayed?._type) {
      case 'landingPage': {
        setSlugString(
          // @ts-ignore
          `landing-preview?slug=${sanityDocument.displayed?.path?.current}`,
        );
        break;
      }
      case 'aboutUsPage': {
        setSlugString('preview?slug=about-preview');
        break;
      }
      case 'mainPage': {
        setSlugString('preview?slug=main-preview');
        break;
      }
      case 'ourWorkPage': {
        setSlugString('preview?slug=our-work-preview');
        break;
      }
      default: {
        setSlugString('default-preview');
        break;
      }
    }
  }, []);

  return (
    <iframe
      title="page"
      id="preview_iframe"
      src={`https://fr-11ty-migration-front.vercel.app/api/${slugString}`}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  const documentsWithPreview = [
    'landingPage',
    'aboutUsPage',
    'mainPage',
    'ourWorkPage',
  ];

  if (documentsWithPreview.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view.component(JsonPreview).title('Preview'),
    ]);
  }
  return S.document();
};
