const og = {
  name: 'og',
  title: 'Open Graph Tags',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'og:title (leave empty to use SEO title)',
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
      description: 'og:description (leave empty to use SEO description)',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      description: 'og:type',
      type: 'string',
    },
    {
      name: 'siteName',
      title: 'Site Name',
      description: 'og:site_name',
      type: 'string',
    },
    {
      name: 'locale',
      title: 'Locale',
      description: 'og:locale',
      type: 'string',
    },
  ],
};

const ogArticle = {
  name: 'ogArticle',
  type: 'object',
  fields: [
    {
      name: 'publisher',
      title: 'Publisher',
      description: 'article:publisher',
      type: 'string',
    },
    {
      name: 'modifiedTime',
      title: 'Modified Time',
      description: 'article:modified_time',
      type: 'date',
    },
  ],
};

const ogTwitter = {
  name: 'ogTwitter',
  type: 'object',
  fields: [
    {
      name: 'card',
      title: 'Twitter Card',
      description: 'twitter:card',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Twitter Title',
      description: 'twitter:title (leave empty to use SEO title)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Twitter Description',
      description: 'twitter:description (leave empty to use SEO description)',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Twitter Image',
      description: 'twitter:image',
      type: 'image',
    },
    {
      name: 'creator',
      title: 'Twitter Creator',
      description: 'twitter:creator',
      type: 'string',
    },
    {
      name: 'site',
      title: 'Twitter site',
      description: 'twitter:site e.g. @TrafficGuardAI',
      type: 'string',
    },
    {
      name: 'label1',
      title: 'Twitter Label',
      description: 'e.g. Written by',
      type: 'string',
    },
    {
      name: 'data1',
      title: 'Twitter Data',
      description: 'e.g. TrafficGuard',
      type: 'string',
    },
    {
      name: 'label2',
      title: 'Twitter Second Label',
      description: 'Est. reading time',
      type: 'string',
    },
    {
      name: 'data2',
      title: 'Twitter Second Data',
      description: 'e.g. 1 minute',
      type: 'string',
    },
  ],
};

const seo = {
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'SEO Description',
      type: 'string',
    },
    {
      name: 'keyWords',
      title: 'Key words',
      type: 'string',
    },
    {
      name: 'ogTags',
      title: 'Open Graph Tags',
      type: 'og',
    },
    {
      name: 'articleTags',
      title: 'Article Tags',
      type: 'ogArticle',
    },
    {
      name: 'ogTwitter',
      title: 'Twitter Tags',
      type: 'ogTwitter',
    },
  ],
};

export default [seo, og, ogArticle, ogTwitter];
