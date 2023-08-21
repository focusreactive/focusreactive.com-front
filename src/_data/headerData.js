const fetch = require("node-fetch");

const query = `*[_type=="header"][0] {
    ...,
    menu[] {
      ...,
      dropdown[] {
      ...,
      logo[] {
        "url": url.asset->url,
        "urlHover": urlHover.asset->url,
      }
    }
  }
}`;

module.exports = async () => {
  let QUERY = encodeURIComponent(query);

  let PROJECT_ID = "vftxng62";
  let DATASET = "production";

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
