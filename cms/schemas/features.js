export const Feature = {
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Feature Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Feature Description',
      type: 'string',
    },
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'networkers',
      title: 'Networkers',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    },
  ],
}
export default {
  name: 'features',
  title: 'Features',
  type: 'object',
  fields: [
    {
      name: 'blockTitle',
      title: 'Block Title',
      type: 'string',
      description: 'Visible only in CMS',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'feature'}],
    },
  ],
}
