export const Bar = {
  name: 'bar',
  title: 'Bar',
  type: 'object',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link',
    },
  ],
}

export default {
  name: 'bars',
  title: 'Bars',
  type: 'object',
  fields: [
    {
      name: 'blockTitle',
      title: 'Block Title',
      type: 'string',
      description: 'Visible only in CMS',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'list',
      title: 'List',
      type: 'array',
      of: [{type: 'bar'}],
    },
  ],
}
