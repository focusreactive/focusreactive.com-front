const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const isPreview = params.eleventy?.serverless?.query?.slug;
  const query = `*[_type == "footer"][0]`;
  const footerData = await fetchSanity(query, { isPreview });

  return footerData.result;
};
