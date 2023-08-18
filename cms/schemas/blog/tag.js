// import sanityClient from '@sanity/client';
//
// const client = sanityClient({
//   projectId: 'ahan5lt9',
//   dataset: 'production',
//   apiVersion: '2022-11-21', // use current UTC date - see "specifying API version"!
//   token: '', // or leave blank for unauthenticated usage
//   useCdn: false, // `false` if you want to ensure fresh data
// });

const tag = {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'label',
      type: 'string',
      // check field for uniqueness, TODO reduce number of request?
      // validation: (Rule) =>
      //   Rule.custom(async (label) =>
      //     client
      //       .fetch(`count(*[_type == "tag" && label == "${label}"])`)
      //       .then((count) => {
      //         if (count === 0) {
      //           return true;
      //         }
      //
      //         return 'Must be unique';
      //       }),
      //   ),
    },
    {
      name: 'permalink',
      type: 'string',
      readOnly: true,
    },
  ],
};

export default tag;
