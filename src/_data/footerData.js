const fetch = require('node-fetch');
const { PROJECT_ID, DATASET, API_VERSION } = require('../../config');

const query = `*[_type=="footer"][0]`;

module.exports = async () => {
  const QUERY = encodeURIComponent(query);

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${QUERY}`;

  const footerData = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return footerData.result;
};
