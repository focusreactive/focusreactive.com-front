const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const isPreview = params.eleventy?.serverless?.query?.slug;
  const query = `*[_type == "ourWorkPage"][0]`;
  const ourWorkData = await fetchSanity(query, { isPreview });

  return ourWorkData.result;
};
