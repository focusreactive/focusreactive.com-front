const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const isPreview = params.eleventy?.serverless?.query?.slug;
  const query = `*[_type == "header"][0] {
    ...,
    menu[] {
      ...,
      dropdown[] {
      ...,
      logo[] {
        "url": url.asset->url,
        "urlHover": urlHover.asset->url,
      },
      dropdown[] {
        ...,
        logo[] {
          "url": url.asset->url,
          "urlHover": urlHover.asset->url,
        }
      }
    }
  }
}`;
  const headerData = await fetchSanity(query, { isPreview });

  return headerData.result;
};
