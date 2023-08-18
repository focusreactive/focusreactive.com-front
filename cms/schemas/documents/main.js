const product = {
  name: 'product',
  type: 'object',
  fields: [
    {
      name: 'titleTextLines',
      title: 'Title Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
  ],
};

const products = {
  name: 'products',
  type: 'object',
  fields: [
    {
      name: 'titleTextLines',
      title: 'Title Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'product' }],
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'buttonUrl',
      title: 'Button Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const whatWeDoItem = {
  name: 'whatWeDoItem',
  type: 'object',
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
  ],
};

const whatWeDo = {
  name: 'whatWeDo',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'whatWeDoItem' }],
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'buttonUrl',
      title: 'Button Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const event = {
  name: 'event',
  type: 'object',
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'type',
      title: 'Event Type',
      type: 'string',
    },
    {
      name: 'hostInfo',
      title: 'Host Info',
      type: 'string',
    },
    {
      name: 'remoteInfo',
      title: 'Remote Info Text',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Event Dates',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const events = {
  name: 'events',
  type: 'object',
  fieldsets: [
    {
      name: 'topEvent',
      title: 'Top Event Data',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
    },
    {
      name: 'firstEventTitle',
      fieldset: 'topEvent',
      title: 'Title Text',
      type: 'string',
    },
    {
      name: 'firstEventTitleLines',
      fieldset: 'topEvent',
      title: 'Event Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'firstEventTypeText',
      fieldset: 'topEvent',
      title: 'Event Type',
      type: 'string',
    },
    {
      name: 'firstEventRemoteInfo',
      fieldset: 'topEvent',
      title: 'Remote Info Text',
      type: 'string',
    },
    {
      name: 'firstEventDate',
      fieldset: 'topEvent',
      title: 'Event Dates',
      type: 'string',
    },
    {
      name: 'firstEventUrl',
      fieldset: 'topEvent',
      title: 'Event Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [{ type: 'event' }],
    },
  ],
};

const link = {
  name: 'link',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const teamMember = {
  name: 'teamMember',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    },
    {
      name: 'keyWords',
      title: 'Key Words',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'link' }],
    },
  ],
};

const membersRow = {
  name: 'membersRow',
  type: 'object',
  preview: {
    select: {
      members: 'members',
    },
    prepare({ members }) {
      if (!members || !members.length) {
        return { title: 'empty' };
      }

      return { title: `${members.map((m) => m.name).join(', ')}` };
    },
  },
  fields: [
    {
      name: 'members',
      type: 'array',
      of: [{ type: 'teamMember' }],
    },
  ],
};

const team = {
  name: 'team',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{ type: 'membersRow' }],
    },
    {
      name: 'allVacanciesLink',
      title: 'Link To All Vacancies',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
};

const emailForm = {
  name: 'emailForm',
  type: 'object',
  fields: [
    {
      name: 'titleLines',
      title: 'Title Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

const techs = {
  name: 'techs',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subTitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'spheres',
      title: 'Spheres',
      type: 'array',
      of: [{ type: 'sphere' }],
    },
  ],
};

const sphere = {
  name: 'sphere',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'list',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'tech' }],
    },
  ],
};

const tech = {
  name: 'tech',
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
    {
      name: 'isPartner',
      title: 'Partner',
      type: 'boolean',
    },
    {
      name: 'src',
      title: 'Image',
      type: 'image',
    },
  ],
};

export const mainPage = {
  name: 'mainPage',
  title: 'Main Page',
  type: 'document',
  preview: { prepare: () => ({ title: 'Home Page' }) },
  fields: [
    {
      name: 'heroLines',
      title: 'Hero Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
      validate: (Rule) =>
        Rule.max(50).warning('No more than 5 words are allowed'),
    },
    {
      name: 'aboutTextLines',
      title: 'About Text Lines',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'products',
      title: 'Products Preview Section',
      type: 'products',
    },
    {
      name: 'whatWeDo',
      title: 'What We Do Section',
      type: 'whatWeDo',
    },
    {
      name: 'techs',
      title: 'Technologies',
      type: 'techs',
    },
    {
      name: 'events',
      title: 'Events Section',
      type: 'events',
    },
    {
      name: 'team',
      title: 'Team Section',
      type: 'team',
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
  mainPage,
  products,
  product,
  whatWeDo,
  whatWeDoItem,
  events,
  event,
  team,
  teamMember,
  link,
  membersRow,
  emailForm,
  techs,
  tech,
  sphere,
];
