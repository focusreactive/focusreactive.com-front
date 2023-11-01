const fetch = require('node-fetch');

const query = `*[_type=="ourWorkPage"][0]`;

module.exports = async (params) => {
  const dynamicSlug = params.eleventy?.serverless?.query?.slug;

  let QUERY = encodeURIComponent(query);
  if (dynamicSlug) {
    QUERY = encodeURIComponent(
      `coalesce(*[_type == "ourWorkPage" && _id in path("drafts.**")][0],*[_type == "ourWorkPage"][0])`,
    );
  }

  let PROJECT_ID = 'vftxng62';
  let DATASET = 'production';

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  const aboutUsData = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return aboutUsData.result;
};
