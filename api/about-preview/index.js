const { EleventyServerless } = require("@11ty/eleventy");

export default async function handler(request, response) {
  const { slug } = request.query;

  let elev = new EleventyServerless("serverless", {
    path: `/dynamics`,
    query: {
      slug: slug.replace("dynamics/", ""),
    },
  });

  try {
    let [page] = await elev.getOutput();
    let html = page.content;

    return response.status(200).send(html);
  } catch (e) {
    return response.status(500).json({ error: e.message });
  }
}
