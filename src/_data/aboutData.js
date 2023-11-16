const fetch = require('node-fetch');
const { PROJECT_ID, DATASET, API_VERSION } = require('../../config');

const query = `*[_type=="aboutUsPage"][0]`;

module.exports = async (params) => {
  const dynamicSlug = params.eleventy?.serverless?.query?.slug;

  let QUERY = encodeURIComponent(query);
  if (dynamicSlug) {
    QUERY = encodeURIComponent(
      `coalesce(*[_type == "aboutUsPage" && _id in path("drafts.**")][0],*[_type == "aboutUsPage"][0])`,
    );
  }

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${QUERY}`;

  const aboutUsData = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return aboutUsData.result;
};
