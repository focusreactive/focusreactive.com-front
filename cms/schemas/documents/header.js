const service = {
  name: 'service',
  type: 'object',
  title: 'Service',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      type: 'array',
      title: 'Logo',
      of: [{ type: 'serviceLogo' }],
      validation: (Rule) => Rule.required(),
    },
  ],
};

const serviceLogo = {
  name: 'serviceLogo',
  type: 'document',
  title: 'Logo',
  description: 'Should contain 2 logod, for a default and hover states',
  fields: [
    {
      name: 'url',
      type: 'image',
      title: 'URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'urlHover',
      type: 'image',
      title: 'Hover URL',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const menuItem = {
  name: 'menuItem',
  type: 'document',
  title: 'Menu Item',
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'inner',
      type: 'boolean',
      title: 'Inner',
      description: `Should be true in case the url is a hash like '#mail-us'`,
    },
    {
      name: 'mod',
      type: 'string',
      title: 'Modifier',
      description: `Some links have not a standart margin, to it can be changed with 'mod' like 'menu__item--mr-lg'. Pls contant Petro for more details.`,
    },
    {
      name: 'dropdown',
      type: 'array',
      title: 'Dropdown',
      of: [{ type: 'service' }],
    },
  ],
};

const header = {
  name: 'header',
  type: 'document',
  fields: [
    {
      name: 'documentTitle',
      title: 'Document Title',
      description: 'visible only in CMS',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'menu',
      title: 'Navigation',
      type: 'array',
      of: [{ type: 'menuItem' }],
    },
  ],
  preview: {
    select: { title: 'title', documentTitle: 'documentTitle' },
    prepare({ title, documentTitle }) {
      return { title: documentTitle || title };
    },
  },
};

export default [header, service, serviceLogo, menuItem];
