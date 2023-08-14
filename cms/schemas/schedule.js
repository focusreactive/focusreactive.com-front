export default {
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  fields: [
    {
      name: 'blockTitle',
      title: 'Block Title',
      type: 'string',
      description: 'Visible only in CMS',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'link',
    },
  ],
}
