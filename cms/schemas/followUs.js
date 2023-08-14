export default {
  name: 'followUs',
  title: 'Follow Us',
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
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
