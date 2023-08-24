const aboutUsPage = {
  name: 'aboutUsPage',
  title: 'About Us Page',
  type: 'document',
  preview: { prepare: () => ({ title: 'About Us' }) },
  fields: [
    {
      name: 'intoTitle',
      title: 'Intro Title',
      type: 'string',
    },

    {
      name: 'intoSubtitle',
      title: 'Intro Subtitle',
      type: 'string',
    },
    {
      name: 'introDescription',
      title: 'Intro Description',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

export default [aboutUsPage];
