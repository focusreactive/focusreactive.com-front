import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'nzudkmke',
    dataset: 'production'
  },
  vite: {
    external: ['part:@sanity/base/datastore/document'],
  },
})
