const { EleventyServerless } = require('@11ty/eleventy');

export default async function handler(request, response) {
  const { slug } = request.query;

  const eleventy = new EleventyServerless('serverlessLandings', {
    path: `/landing-preview`,
    query: {
      slug: slug.replace('landing-preview/', ''),
    },
  });

  try {
    const data = await eleventy.getOutput();
    console.log(data);
    const [page] = data;
    const html = page.content;

    return response.status(200).send(html);
  } catch (e) {
    return response.status(500).json({ error: e.message });
  }
}
