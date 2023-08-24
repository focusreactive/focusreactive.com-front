const author = {
  name: 'author',
  title: 'Author',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'about',
      title: 'About',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'id',
      title: 'Id',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Social url',
      type: 'string',
    },
  ],
};

export default author;
