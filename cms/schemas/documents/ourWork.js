const workCategory = {
  name: 'workCategory',
  type: 'object',
  title: 'Category',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'descriptionTitle',
      title: 'Description Title',
      type: 'string',
    },
    {
      name: 'descriptionElements',
      title: 'Description Elements',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'linkTitle',
      title: 'Link Title',
      type: 'string',
    },
    {
      name: 'linkUrl',
      title: 'Link Url',
      type: 'string',
    },
  ],
};

const workCategoryBlock = {
  name: 'workCategoryBlock',
  type: 'object',
  title: 'Category Block',
  fields: [
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'workCategory' }],
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'linkTitle',
      title: 'Link Title',
      type: 'string',
    },
  ],
};

const highlightsItem = {
  name: 'highlightsItem',
  title: 'Highlights Item',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'string' },
  ],
};

const highlights = {
  name: 'highlights',
  title: 'Highlights Block',
  type: 'object',
  fields: [
    {
      name: 'elements',
      type: 'array',
      of: [{ type: 'highlightsItem' }],
    },
  ],
};

const ourWorkPage = {
  name: 'ourWorkPage',
  title: 'Our Work Page',
  type: 'document',
  preview: { prepare: () => ({ title: 'Our Work' }) },
  fields: [
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
      name: 'categories',
      title: 'Categories',
      type: 'workCategoryBlock',
    },
    {
      name: 'highlights',
      title: 'Highlights Block',
      type: 'highlights',
    },
    {
      name: 'emailForm',
      title: 'Email Form Section',
      type: 'emailForm',
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'footer' }],
    },
  ],
};

export default [
  ourWorkPage,
  workCategory,
  workCategoryBlock,
  highlights,
  highlightsItem,
];
