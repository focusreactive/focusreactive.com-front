import { useEffect } from 'react';

export const usePreview = () => {
  useEffect(() => {
    const previewOrigin = 'https://focusreactivecom-blog-preview.vercel.app';
    const studioOrigin = 'https://fr-website.sanity.studio';

    const getIsLocalHost = (origin: string) => origin.startsWith('http://localhost');

    const isPreview = window.location.origin === previewOrigin;
    if (!isPreview && !getIsLocalHost(window.location.origin)) return;

    window.addEventListener('message', receiveMessage, false);

    function receiveMessage(event) {
      const isMessageFromStudio = event.origin === studioOrigin;
      if (!isMessageFromStudio && !getIsLocalHost(event.origin)) return;

      if (event.data === 'reload()') {
        window.location.reload();
      }

      return () => {
        window.removeEventListener('message', receiveMessage);
      };
    }
  }, []);
};
