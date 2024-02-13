const { PERSPECTIVE, PROJECT_ID, API_VERSION, DATASET } = require('../../config');

const buildSanityApiUrl = (query, { perspective = PERSPECTIVE } = {}) => {
  const urlParams = new URLSearchParams({
    query,
    perspective,
  });

  return `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?${urlParams.toString()}`;
};

const fetchSanity = async (query, { isPreview } = {}) => {
  const perspective = isPreview ? 'previewDrafts' : undefined;
  const params = {
    perspective,
  };
  const url = buildSanityApiUrl(query, params);

  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((result) => (result.error ? Promise.reject(result.error) : result))
    .catch((err) =>
      console.error(
        `Error fetching data from Sanity:\nQuery: %o\nParams: %o\nError: %o\n\n`,
        query,
        params,
        err,
      ),
    );
};

module.exports = { fetchSanity };
