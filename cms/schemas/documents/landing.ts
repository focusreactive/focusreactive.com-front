const getBlock = (name, { fields, type }) => ({
  name,
  type: type || 'object',
  fields: [
    {
      name: 'documentTitle',
      title: 'Document Title',
      description: 'visible only in CMS',
      type: 'string',
    },
    ...fields,
  ],
  preview: {
    select: { title: 'title', documentTitle: 'documentTitle' },
    prepare({ title, documentTitle }) {
      return { subtitle: name, title: documentTitle || title };
    },
  },
});

const heroDark = getBlock('heroDark', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'colored',
      title: 'Title has full-color style',
      type: 'boolean',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'hint',
      title: 'Hint',
      type: 'string',
    },
  ],
});

const hero = getBlock('hero', {
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isCustomFirstLineDisabled',
      title: 'Custom first line styled disabled',
      description: '(transparent && border)',
      type: 'boolean',
    },
    {
      name: 'titleColor',
      title: 'Title Color',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'partners',
      type: 'array',
      of: [{ type: 'heroPartner' }],
    },
  ],
});

const heroPartner = getBlock('heroPartner', {
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Logo',
      type: 'image',
    },
  ],
});

const aboutText = getBlock('aboutText', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'richText',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
});

const teasersItem = getBlock('teasersItem', {
  fields: [
    {
      name: 'image',
      title: 'Logo',
      type: 'image',
    },
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
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Link',
      type: 'url',
    },
  ],
});

const teasers = getBlock('teasers', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'teasersItem' }],
    },
  ],
});

const reviewsItem = getBlock('reviewsItem', {
  fields: [
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
  ],
});

const reviews = getBlock('reviews', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'reviewsItem' }],
    },
  ],
});

const clientsAccordionItem = getBlock('clientsAccordionItem', {
  fields: [
    {
      name: 'name',
      title: 'Name',
      description: 'left side',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      description: 'right side',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'linkTitle',
      title: 'Link Title',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
  ],
});

const clientsAccordion = getBlock('clientsAccordion', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'cases',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'clientsAccordionItem' }],
    },
  ],
});

const landingBlogItem = getBlock('landingBlogItem', {
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
      name: 'url',
      title: 'Url',
      type: 'url',
      validation: (rule) => rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
});

const landingBlog = getBlock('landingBlog', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'cases',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'landingBlogItem' }],
    },
  ],
});

const officesMap = getBlock('officesMap', {
  fields: [],
});

const countersItem = getBlock('countersItem', {
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'value', title: 'Value', type: 'string' },
    { name: 'description', title: 'Description', type: 'string' },
  ],
});

const counters = getBlock('counters', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Elements',
      type: 'array',
      of: [{ type: 'countersItem' }],
    },
    {
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
    },
    {
      name: 'articleText',
      title: 'Article Text',
      type: 'string',
    },
  ],
});

const singleReview = getBlock('singleReview', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
    },
    {
      name: 'name',
      title: 'Author Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Author Role',
      type: 'string',
    },
    {
      name: 'text',
      title: ' Author Text',
      type: 'string',
    },
  ],
});

const contentColumns = getBlock('contentColumns', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
    {
      name: 'linkTitle',
      title: 'Link Title',
      type: 'string',
    },
  ],
});

const technologiesItem = getBlock('technologiesItem', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
});

const technologies = getBlock('technologies', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'elements',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'technologiesItem' }],
    },
  ],
});

const heroContentSmall = getBlock('heroContentSmall', {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
  ],
});

const landingPage = {
  name: 'landingPage',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'Page SEO Settings',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      fieldset: 'seo',
      name: 'seo',
      title: 'SEO & Metatags',
      type: 'seo',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'path',
      title: 'Page Path',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    },
    {
      name: 'blocks',
      title: 'Page Blocks',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'heroDark' },
        { type: 'aboutText' },
        { type: 'teasers' },
        { type: 'reviews' },
        { type: 'clientsAccordion' },
        { type: 'landingBlog' },
        { type: 'officesMap' },
        { type: 'counters' },
        { type: 'singleReview' },
        { type: 'contentColumns' },
        { type: 'technologies' },
        { type: 'heroContentSmall' },
      ],
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
  landingPage,
  hero,
  heroDark,
  heroPartner,
  aboutText,
  teasers,
  teasersItem,
  reviews,
  reviewsItem,
  clientsAccordion,
  clientsAccordionItem,
  landingBlog,
  landingBlogItem,
  officesMap,
  counters,
  countersItem,
  singleReview,
  contentColumns,
  technologies,
  technologiesItem,
  heroContentSmall,
];
