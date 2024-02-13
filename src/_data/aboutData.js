const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const isPreview = params.eleventy?.serverless?.query?.slug;
  const query = `*[_type == "aboutUsPage"][0]`;
  const aboutData = await fetchSanity(query, { isPreview });

  return aboutData.result;
};
