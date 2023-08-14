export const Speaker = {
  name: 'speaker',
  title: 'Speaker',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Speaker Name and Surname',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Speaker Avatar',
      type: 'image',
    },
    {
      name: 'company',
      title: 'Speaker Company',
      type: 'string',
    },
    {
      name: 'talk',
      title: 'Speaker Talk',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'text',
      title: 'Speaker Text',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}

export default {
  name: 'speakers',
  title: 'Speakers',
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
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'speaker'}],
    },
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'link',
    },
  ],
}
