export const HeroStatistic = {
  name: 'heroStatistic',
  title: 'Hero Statistic',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string',
    },
  ],
}

export const HeroSpeakers = {
  name: 'heroSpeakers',
  title: 'Hero Speakers',
  type: 'object',
  fields: [
    {
      name: 'speakerPhoto',
      title: 'Speaker Photo',
      type: 'image',
    },
    {
      name: 'backgroundIcon',
      title: 'Background Icon',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare: () => ({title: 'Speaker'}),
  },
}
export default {
  name: 'hero',
  title: 'Hero',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'mainLink',
      title: 'Main Link',
      type: 'link',
    },
    {
      name: 'secondaryLink',
      title: 'Secondary Link',
      type: 'link',
    },
    {
      name: 'statistic',
      title: 'Statistic',
      type: 'array',
      of: [{type: 'heroStatistic'}],
    },
    {
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{type: 'heroSpeakers'}],
    },
  ],
}
