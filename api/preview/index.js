const { EleventyServerless } = require("@11ty/eleventy");

export default async function handler(request, response) {
  const { slug } = request.query;

  let elev = new EleventyServerless("serverless", {
    path: `/dynamic`,
    query: {
      slug: slug.replace("dynamic/", ""),
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
