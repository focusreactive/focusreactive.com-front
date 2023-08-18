const footer = {
  name: 'footer',
  type: 'document',
  fields: [
    {
      name: 'documentTitle',
      title: 'Document Title',
      description: 'visible only in CMS',
      type: 'string',
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'url',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'copyInfo',
      title: '© String',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'contactInfo',
      title: 'Contact info',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'title', documentTitle: 'documentTitle' },
    prepare({ title, documentTitle }) {
      return { title: documentTitle || title };
    },
  },
};

export default [footer];
