import bars from '../schemas/bars'
import discussions from '../schemas/discussions'
import event from '../schemas/event'
import features from '../schemas/features'
import followUs from '../schemas/followUs'
import fullTicket from '../schemas/fullTicket'
import hero from '../schemas/hero'
import schedule from '../schemas/schedule'
import speakers from '../schemas/speakers'

const blocks = [bars, discussions, event, features, followUs, fullTicket, hero, schedule, speakers]
export const contentBlocks = blocks.map((block) => ({
  type: block.name,
}))

export default {
  name: 'pages',
  title: 'Pages',
  type: 'document',
  fields: [
    {
      name: 'pageName',
      title: 'Page Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'pageName',
      },
    },
    {
      name: 'pageContent',
      title: 'Page Content',
      type: 'array',
      of: contentBlocks,
    },
  ],
}
