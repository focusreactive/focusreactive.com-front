const { EleventyServerless } = require('@11ty/eleventy');

export default async function handler(request, response) {
  const { slug } = request.query;

  // const eleventy = new EleventyServerless('serverlessLandings', {
  //   path: `/landing-preview`,
  //   query: {
  //     slug: slug.replace('landing-preview/', ''),
  //   },
  // });

  return response.status(200).json({ hello: 'world' });
}
