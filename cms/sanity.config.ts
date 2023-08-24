import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { markdownSchema } from 'sanity-plugin-markdown';
import { defaultDocumentNode } from './structure';

export default defineConfig({
  name: 'fr-website',
  title: 'FR Website',

  projectId: 'vftxng62',
  dataset: 'production',

  plugins: [
    deskTool({
      defaultDocumentNode,
    }),
    visionTool({
      defaultApiVersion: '2021-10-21',
    }),
    markdownSchema(),
  ],

  schema: {
    types: schemaTypes,
  },
});
