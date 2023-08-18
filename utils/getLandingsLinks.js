const fetch = require("node-fetch");

const query = `*[_type == 'landingPage' && !(_id in path("drafts.**"))].path.current`;

export const getLandingsLinks = async (params) => {
  let QUERY = encodeURIComponent(query);

  let PROJECT_ID = "vftxng62";
  let DATASET = "production";

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  const data = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  console.log(data.result, "data.result");

  return data?.result?.length ? data.result : [data.result];
};
