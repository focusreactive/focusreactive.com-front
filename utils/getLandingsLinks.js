import { DATASET, PROJECT_ID, API_VERSION } from '../config';

const fetch = require('node-fetch');

const query = `*[_type == 'landingPage' && !(_id in path("drafts.**"))].path.current`;

export const getLandingsLinks = async () => {
  let QUERY = encodeURIComponent(query);

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${QUERY}`;

  const data = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return data?.result?.length ? data.result : [data.result];
};
