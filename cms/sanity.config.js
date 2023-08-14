import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {defaultDocumentNodeResolver} from "./utils/deskStructure";

export default defineConfig({
  name: 'default',
  title: '11ty-Nunjucks',

  projectId: 'nzudkmke',
  dataset: 'production',

  plugins: [deskTool({defaultDocumentNode: defaultDocumentNodeResolver}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
