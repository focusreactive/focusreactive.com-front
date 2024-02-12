import React from 'react';
import NotFound from '@theme-original/NotFound';
import { usePreview } from '@site/src/hooks/usePreview';

export default function NotFoundWrapper(props) {
  usePreview();

  return (
    <>
      <NotFound {...props} />
    </>
  );
}
